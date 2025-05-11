// File: backend/controllers/carsControllers.js
const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsControllers');
const { authenticateJWT } = require('../middleware/auth');

router.get('/destacados', carsController.getFeaturedCars);
router.get('/all', carsController.getAllCars);
router.post('/createCar', authenticateJWT, carsController.createCar);
router.get('/:id', carsController.getCarById);
router.get('/cochesUsuario/:id', authenticateJWT, carsController.getUserCars); 

module.exports = router;