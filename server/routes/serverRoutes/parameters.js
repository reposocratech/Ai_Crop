var express = require('express');
const ParametersController = require('../../controllers/serverControllers/parametersControllers');
var router = express.Router();

//1. Compara los parámetros establecidos en el greenhouse con las últimas medidas que obtuvo
// localhost:4000/server/parameters/compare/:greenhouse_id
router.get('/compare/:greenhouse_id', ParametersController.compareParameters);

// 2. Muestra la última medida de un parámetro específico de un greenhouse específico
// localhost:4000/server/parameters/current/:greenhouse_id/:measurement_type_id
router.get('/current/:greenhouse_id/:measurement_type_id', ParametersController.getMeasureDetails);

// 3. Muestra el historial completo de una medida
// localhost:4000/server/parameters/history/:greenhouse_id/:measurement_type_id
router.get('/history/:greenhouse_id/:measurement_type_id', ParametersController.getMeasureHistory)

module.exports = router;