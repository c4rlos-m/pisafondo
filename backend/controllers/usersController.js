const supabase = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Configurar multer para manejar archivos en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.log("Error al obtener los usuarios:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("Usuarios obtenidos:", data);
    res.json(data);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Obtenido del middleware authenticateJWT
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, created_at,profile_pic')
      .eq('id', userId)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ error: "Error al obtener el perfil" });
  }
};

// Actualizar el perfil del usuario autenticado
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const profilePic = req.file; // Archivo subido

    // Validar campos obligatorios
    if (!name || !email) {
      return res.status(400).json({ error: 'El nombre y el email son obligatorios' });
    }

    let profilePicUrl = null;
    if (profilePic) {
      // Generar un nombre único para la imagen
      const fileName = `${userId}-${Date.now()}-${profilePic.originalname}`;
      const { data, error } = await supabase.storage
        .from('profile.images')
        .upload(fileName, profilePic.buffer, {
          contentType: profilePic.mimetype,
        });

      if (error) throw error;

      // Obtener la URL pública
      const { data: publicData } = supabase.storage
        .from('profile.images')
        .getPublicUrl(fileName);

      profilePicUrl = publicData.publicUrl;
    }

    // Actualizar el perfil en la base de datos
    const { data, error } = await supabase
      .from('users')
      .update({
        name,
        email,
        ...(profilePicUrl && { profile_pic: profilePicUrl }), // Solo actualizar si hay nueva imagen
      })
      .eq('id', userId)
      .select('id, name, email, created_at, profile_pic')
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};


// Crear un usuario
const createUser = async (req, res) => {
  console.log('Cuerpo recibido:', req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log('Campos extraídos:', { name, email, password });
    return res.status(400).json({ error: 'Faltan campos requeridos: name, email y password son obligatorios' });
  }

  try {
    // Verificar si el nombre de usuario ya existe
    const { data: usernameData, error: usernameError } = await supabase
      .from('users')
      .select('name')
      .eq('name', name)
      .single();

    if (usernameData) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }
    if (usernameError && usernameError.code !== 'PGRST116') {
      console.error("Error al verificar nombre de usuario:", usernameError);
      return res.status(500).json({ error: usernameError.message });
    }

    // Verificar si el email ya existe
    const { data: emailData, error: emailError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (emailData) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
    if (emailError && emailError.code !== 'PGRST116') {
      console.error("Error al verificar correo electrónico:", emailError);
      return res.status(500).json({ error: emailError.message });
    }

    // Crear el usuario
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select();

    if (error) {
      console.error('Error al insertar usuario en Supabase:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Usuario creado exitosamente', user: data[0] });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno al procesar la solicitud' });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, password, role')
    .eq('email', email)
    .single();

  if (error || !data) {
    return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
  }

  const isMatch = await bcrypt.compare(password, data.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
  }

  const token = jwt.sign(
    { id: data.id, username: data.name, role: data.role },
    process.env.JWT_SECRET,
    { expiresIn: '6h' }
  );

  res.json({ token });
};

// Verificar nombre de usuario
const checkUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const { data, error } = await supabase
      .from('users')
      .select('name')
      .eq('name', username)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Error al verificar nombre de usuario:", error);
      return res.status(500).json({ message: "Error al verificar el nombre de usuario", error: error.message });
    }

    const exists = !!data;
    res.json({ exists });
  } catch (error) {
    console.error("Error en checkUsername:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// Verificar correo electrónico
const checkEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "El correo electrónico es requerido" });
    }

    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Error al verificar correo electrónico:", error);
      return res.status(500).json({ message: "Error al verificar el correo electrónico", error: error.message });
    }

    const exists = !!data;
    res.json({ exists });
  } catch (error) {
    console.error("Error en checkEmail:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

module.exports = { getUsers, getUserProfile, updateUserProfile: [upload.single('profile_pic'), updateUserProfile], createUser, loginUser, checkUsername, checkEmail };