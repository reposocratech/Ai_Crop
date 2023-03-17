var express = require('express');
//const greenhouseControllers = require('../../controllers/clientControllers/GreenHouseControllers');
//const multer = require("../middleware/multer");
const GreenHouseController = require('../../controllers/clientControllers/greenhouseControllers');
var router = express.Router();

//1. create greenhouse
// localhost:4000/greenhouse/createGreenhouse
router.get('/createGreenhouse', GreenhouseController.createGreenhouse);
// TO DO:
// CAMBIAR metodo a POST


//2. edit greenhouse
// localhost:4000/greenhouse/createGreenhouse
router.post('/editGreenhouse/:greenhouse_id', GreenhouseController.editGreenhouse);
// TO DO: TESTEAR!!!




router.get("/:greenhouse_id/allCrops", GreenHouseController.getAllCrops); */

module.exports = router;