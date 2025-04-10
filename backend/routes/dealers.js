// routes/dealers.js
const express = require('express');
const dealerController = require('../controllers/dealerController');

const router = express.Router();

router.get('/search', dealerController.searchDealers);
router.get('/:id', dealerController.getDealerById);
router.get('/', dealerController.getAllDealers);

module.exports = router;