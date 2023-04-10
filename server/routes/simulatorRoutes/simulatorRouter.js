var express = require('express');
const SimulatorController = require('../../controllers/simulatorControllers/simulatorController');

var router = express.Router();


//1. localhost:4000/simulator
router.post('/', SimulatorController.simulateData);


//2. get a list of all the greenhouses
// localhost:4000/simulator/getGreenhousesList
router.get('/getGreenhousesList', SimulatorController.getGreenhousesList);


module.exports = router;
