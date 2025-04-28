// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const usersRoutes = require('./routes/users');
const carsRoutes = require('./routes/coches');
const contactRoutes = require('./routes/contact');
const dealerRoutes = require('./routes/dealers');
const adminRoutes = require('./routes/admin');
const messagesRoutes = require('./routes/messages'); // Rutas originales de mensajes
const chatRoutes = require('./routes/chats'); // Nuevas rutas de chats
const authRoutes = require('./routes/auth');
// Use routes
app.use('/users', usersRoutes);
app.use('/cars', carsRoutes);
app.use('/contact', contactRoutes);
app.use('/dealers', dealerRoutes);
app.use('/admin', adminRoutes);
app.use('/messages', messagesRoutes); // Mantener para compatibilidad
app.use('/chats', chatRoutes); // Añadir nuevas rutas de chats
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});