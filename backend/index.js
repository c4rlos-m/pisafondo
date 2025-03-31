// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();  // Cargar variables de entorno

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  

// Importar las rutas
const usersRoutes = require('./routes/users');

const carsRoutes = require('./routes/coches');

// Usar las rutas
app.use('/users', usersRoutes);
app.use('/cars', carsRoutes);
// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
