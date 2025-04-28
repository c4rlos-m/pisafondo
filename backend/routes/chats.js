const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const { getChats, createChat, getChatById, joinChat } = require('../controllers/chatsController');
const { getMessages, postMessage } = require('../controllers/messagesController');

router.get('/', authenticateJWT, getChats);
router.post('/', authenticateJWT, createChat);
router.get('/:id', authenticateJWT, getChatById);
router.post('/join', authenticateJWT, joinChat);
router.get('/:chatId/messages', authenticateJWT, getMessages);
router.post('/:chatId/messages', authenticateJWT, postMessage);

module.exports = router;