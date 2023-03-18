var express = require('express');
const ParametersController = require('../../controllers/serverControllers/parametersControllers');
var router = express.Router();

//1. 
// localhost:4000/server/parameters/current/:greenhouse_id
router.get('/current/:greenhouse_id', ParametersController.getParameters);

//2. 
// localhost:4000/server/parameters/compare/:greenhouse_id
router.get('/compare/:greenhouse_id', ParametersController.compareParameters);


module.exports = router;