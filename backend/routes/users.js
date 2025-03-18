// routes/users.js
const express = require('express');
const { getUsers, createUser, loginUser, getAdminDashboard } = require('../controllers/usersController');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/public', getUsers);
router.get('/', authenticateJWT, getUsers);
router.get('/admin/dashboard', authenticateJWT, getAdminDashboard); // Nueva ruta para el dashboard

module.exports = router;