var express = require('express');
const SimulatorController = require('../../controllers/simulatorControllers/simulatorController');

var router = express.Router();


// localhost:4000/simulator
router.post('/', SimulatorController.simulateData);

module.exports = router;
