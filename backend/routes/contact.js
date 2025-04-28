//routes/contact.js
const express = require('express');
const { createContact, getContacts, replyContact } = require('../controllers/contactController');
const { authenticateJWT, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/contact', createContact); // Público: cualquiera puede enviar un mensaje
router.get('/', authenticateJWT, requireAdmin, getContacts); // Solo admins pueden listar contactos
router.post('/reply', authenticateJWT, requireAdmin, replyContact); // Solo admins pueden responder

module.exports = router;