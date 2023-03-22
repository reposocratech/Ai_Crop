var express = require('express');
const ParametersController = require('../../controllers/serverControllers/parametersControllers');
var router = express.Router();

//1. 
// localhost:4000/server/parameters/history/:greenhouse_id/measurement_type
router.get('/history/:greenhouse_id/:measurement_type', ParametersController.getParameterHistory);

// en la vista de un parametro:
// current value, max, min, historic values of parameter, alerta (detalles de la ultima)

//1. Compara los parámetros establecidos en el greenhouse con las últimas medidas que obtuvo
// localhost:4000/server/parameters/compare/:greenhouse_id
router.get('/compare/:greenhouse_id', ParametersController.compareParameters);


module.exports = router;