const crypto = require('crypto');
const supabase = require('../config/database');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Crear el transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // o el servicio que uses
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 1. Solicitar recuperación de contraseña
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Buscar usuario
  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(400).json({ error: "No se encontró ningún usuario con ese correo" });
  }

  // Crear token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  // Guardarlo en la tabla
  const { error: tokenError } = await supabase
    .from('password_reset_tokens')
    .insert([{ user_id: user.id, token, expires_at: expiresAt }]);

  if (tokenError) {
    console.error(tokenError);
    return res.status(500).json({ error: "Error al crear el token de recuperación" });
  }

  // Mandar correo
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Recuperación de contraseña",
    html: `<p>Hola,</p>
           <p>Haz click en el siguiente enlace para recuperar tu contraseña:</p>
           <a href="${resetLink}">Recuperar contraseña</a>
           <p>Este enlace expirará en 1 hora.</p>`
  });

  res.json({ message: "Se ha enviado un correo con las instrucciones para recuperar tu contraseña." });
};

// 2. Cambiar la contraseña
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Buscar token
  const { data: resetData, error } = await supabase
    .from('password_reset_tokens')
    .select('user_id, expires_at')
    .eq('token', token)
    .single();

  if (error || !resetData) {
    return res.status(400).json({ error: "Token inválido o expirado" });
  }
  
  const now = new Date().toISOString(); // ahora en ISO/UTC
  console.log("Token expira en:", resetData.expires_at);
  console.log("Hora actual:", now);

if (resetData.expires_at < now) {
    return res.status(400).json({ error: "Token expirado" });
}


  // Actualizar la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const { error: updateError } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('id', resetData.user_id);

  if (updateError) {
    return res.status(500).json({ error: "Error al actualizar la contraseña" });
  }

  // Eliminar el token
  await supabase
    .from('password_reset_tokens')
    .delete()
    .eq('token', token);

  res.json({ message: "Contraseña actualizada correctamente" });
};

module.exports = { forgotPassword, resetPassword };
