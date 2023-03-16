var express = require('express');
const simulatorController = require('../../controllers/simulatorControllers/simulatorController');
var router = express.Router();


// localhost:4000/simulator
router.get('/', simulatorController.getSimulator);

module.exports = router;
