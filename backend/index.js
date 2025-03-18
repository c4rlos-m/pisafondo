// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();  // Cargar variables de entorno

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Para manejar JSON en las solicitudes

// Importar las rutas
const usersRoutes = require('./routes/users');

// Usar las rutas
app.use('/users', usersRoutes);

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
