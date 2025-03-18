// config/database.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();  // Cargar variables de entorno

// Crear el cliente de Supabase con la clave de servicio
const supabase = createClient(
    process.env.SUPABASE_URL,         // URL de tu proyecto en Supabase
    process.env.SUPABASE_SERVICE_ROLE_KEY  // Usar la clave de servicio
);

module.exports = supabase;