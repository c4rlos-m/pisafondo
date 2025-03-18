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

const getAdminDashboard = async (req, res) => {
  // Verificar que el usuario sea administrador
  if (req.user.role !== 'administrador') {
    return res.status(403).json({ error: 'Acceso denegado. Solo para administradores.' });
  }

  try {
    // Obtener estadísticas
    const { data: totalUsers, error: totalUsersError } = await supabase
      .from('users')
      .select('id', { count: 'exact' });
    
    const { data: totalMedicos, error: medicosError } = await supabase
      .from('users')
      .select('id', { count: 'exact' })
      .eq('role', 'medico');
    
    const { data: totalPacientes, error: pacientesError } = await supabase
      .from('users')
      .select('id', { count: 'exact' })
      .eq('role', 'paciente');
    
    const { data: recentUsers, error: recentUsersError } = await supabase
      .from('users')
      .select('id, email, role')
      .order('id', { ascending: false })
      .limit(5);

    if (totalUsersError || medicosError || pacientesError || recentUsersError) {
      console.error('Error al obtener datos del dashboard:', { totalUsersError, medicosError, pacientesError, recentUsersError });
      return res.status(500).json({ error: 'Error al obtener datos del dashboard' });
    }

    res.json({
      totalUsers: totalUsers.length,
      totalMedicos: totalMedicos.length,
      totalPacientes: totalPacientes.length,
      pendingAppointments: 25, // Simulado por ahora, ajusta si tienes una tabla de citas
      recentUsers
    });
  } catch (error) {
    console.error('Error en getAdminDashboard:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getUsers, createUser, loginUser, getAdminDashboard };
