// controllers/usersController.js
const supabase = require('../config/database');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');



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

const createUser = async (req, res) => {
    console.log('Cuerpo recibido:', req.body);  
    const { name, email, password } = req.body;  
  
    if (!name || !email || !password) {
      console.log('Campos extraídos:', { name, email, password });  
      return res.status(400).json({ error: 'Faltan campos requeridos: name, email y password son obligatorios' });
    }
  
    try {
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
  
      res.json(data);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno al procesar la solicitud' });
    }
  };
  

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Buscar al usuario por su email
    const { data, error } = await supabase
        .from('users')
        .select('*')
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
        { id: data.id, role: data.role },  
        process.env.JWT_SECRET,            
        { expiresIn: '1h' }               
    );

    res.json({ token });
};



module.exports = { getUsers, createUser, loginUser };
