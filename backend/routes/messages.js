const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const messagesController = require('../controllers/messagesController');

// Esta ruta ahora debería redirigir al primer chat disponible o ser obsoleta
router.get('/', authenticateJWT, async (req, res) => {
  // Puedes redirigir al primer chat o devolver un error
  res.status(400).json({ error: 'Please specify a chat ID' });
});

// Esta ruta se mantiene para compatibilidad, pero debería ser obsoleta
router.post('/', authenticateJWT, async (req, res) => {
  res.status(400).json({ error: 'Please specify a chat ID' });
});

module.exports = router;