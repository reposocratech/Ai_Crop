var express = require('express');
const simulatorController = require('../../controllers/simulatorControllers/simulatorController');
var router = express.Router();


// localhost:4000/simulator
router.post('/', simulatorController.simulateData);

module.exports = router;
