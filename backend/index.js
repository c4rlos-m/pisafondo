const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar las rutas
const usersRoutes = require('./routes/users');
const carsRoutes = require('./routes/coches');
const contactRoutes = require('./routes/contact');
const dealerRoutes = require('./routes/dealers');
const adminRoutes = require('./routes/admin');

// Usar las rutas
app.use('/users', usersRoutes);
app.use('/cars', carsRoutes);
app.use('/contact', contactRoutes);
app.use('/dealers', dealerRoutes);
app.use('/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});