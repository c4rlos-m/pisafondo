const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'carlosmarquezmolina1@gmail.com', // Cambia esto por un correo donde puedas verificar
    subject: 'Prueba de Nodemailer',
    text: '¡Hola! Esto es una prueba desde tu backend.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

sendTestEmail();