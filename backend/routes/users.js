// routes/users.js
const express = require('express');
const { getUsers, getUserProfile,createUser, loginUser, checkUsername, checkEmail } = require('../controllers/usersController');
const {authenticateJWT} = require('../middleware/auth');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/public', getUsers);
router.get('/check-username/:username', checkUsername);
router.get('/check-email/:email', checkEmail); // Cambiado de POST a GET con parámetro :email
router.get('/', authenticateJWT, getUsers);
router.get("/profile", authenticateJWT, getUserProfile);




module.exports = router;