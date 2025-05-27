// routes/admin.js
const express = require('express');
const { vehiculosPorValidar, vehiculoAceptado, vehiculoDenegado,reserva,vehiculosReservados  } = require('../controllers/adminController');
const { authenticateJWT } = require('../middleware/auth');


const router = express.Router();

router.get('/vehiculos_por_validar', vehiculosPorValidar);
router.post('/vehiculo_aceptado', vehiculoAceptado);
router.post('/vehiculo_denegado', vehiculoDenegado);
router.post('/reserva',authenticateJWT, reserva);
router.get('/vehiculos_reservados', vehiculosReservados);

module.exports = router;