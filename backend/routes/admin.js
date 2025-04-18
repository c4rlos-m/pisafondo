const express = require('express');
const { vehiculosPorValidar, vehiculoAceptado, vehiculoDenegado } = require('../controllers/adminController');

const router = express.Router();

router.get('/vehiculos_por_validar', vehiculosPorValidar);
router.post('/vehiculo_aceptado', vehiculoAceptado);
router.post('/vehiculo_denegado', vehiculoDenegado);

module.exports = router;