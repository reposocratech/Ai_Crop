var express = require('express');
const ParametersController = require('../../controllers/serverControllers/parametersControllers');
var router = express.Router();

//1. Compara los parámetros establecidos en el greenhouse con las últimas medidas que obtuvo
// localhost:4000/server/parameters/compare/:greenhouse_id
router.get('/compare/:greenhouse_id', ParametersController.compareParameters);

// 2. Muestra todas las medidas históricas de temperatura para un invernadero 
// localhost:4000/server/parameters/history/temperature/:greenhouse_id
router.get('/history/temperature/:greenhouse_id', ParametersController.getTemperatureHistory);

// 3. Muestra todas las medidas históricas de co2 para un invernadero 
// localhost:4000/server/parameters/history/co2/:greenhouse_id
router.get('/history/co2/:greenhouse_id', ParametersController.getCo2History);

// 4. Muestra todas las medidas históricas de humedad para un invernadero 
// localhost:4000/server/parameters/history/humidity/:greenhouse_id
router.get('/history/humidity/:greenhouse_id', ParametersController.getHumidityHistory);

// 5. Muestra todas las medidas históricas de luz solar para un invernadero 
// localhost:4000/server/parameters/history/sunlight/:greenhouse_id
router.get('/history/sunlight/:greenhouse_id', ParametersController.getSunlightHistory);

// 6. Muestra todas las medidas históricas de ph para un invernadero 
// localhost:4000/server/parameters/history/ph/:greenhouse_id
router.get('/history/ph/:greenhouse_id', ParametersController.getPhHistory);

// 7. Muestra todas las medidas históricas de ce para un invernadero 
// localhost:4000/server/parameters/history/ce/:greenhouse_id
router.get('/history/ce/:greenhouse_id', ParametersController.getCeHistory);

// 8. Muestra todas las medidas históricas de humedad de hoja para un invernadero 
// localhost:4000/server/parameters/history/leafhumidity/:greenhouse_id
router.get('/history/leafhumidity/:greenhouse_id', ParametersController.getLeafHumidityHistory);

// 9. Muestra la última medida de un parámetro específico de un greenhouse específico
// localhost:4000/server/parameters/current/:greenhouse_id/:measurement_type_id
router.get('/current/:greenhouse_id/:measurement_type_id', ParametersController.getMeasureDetails);

// 10.1 Muestra el promedio de mediddas por measurement_type_id por día dela última semana.
// localhost:4000/server/parameters/week/:greenhouse_id/:measurement_type_id
router.get('/week/:greenhouse_id/:measurement_type_id', ParametersController.getMeasureHistoryWeek);

// 10.2 Muestra el promedio de mediddas por measurement_type_id por mes del último año.
// localhost:4000/server/parameters/month/:greenhouse_id/:measurement_type_id
router.get('/month/:greenhouse_id/:measurement_type_id', ParametersController.getMeasureHistoryMonth);

// 10.3 Muestra el promedio de mediddas por measurement_type_id por mes del último año.
// localhost:4000/server/parameters/year/:greenhouse_id/:measurement_type_id
router.get('/year/:greenhouse_id/:measurement_type_id', ParametersController.getMeasureHistoryYear);

module.exports = router;