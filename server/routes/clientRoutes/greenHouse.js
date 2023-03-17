var express = require('express');
//const greenhouseControllers = require('../../controllers/clientControllers/GreenHouseControllers');
//const multer = require("../middleware/multer");
const GreenHouseController = require('../../controllers/clientControllers/greenhouseControllers');
var router = express.Router();

//---.trae la info de todos los invernaderos
//localhost:4000/greenHouse/getAllGreenHouses/:user_owner_id
router.get("/getAllGreenHouses/:user_owner_id", GreenHouseController.getAllGreenHouses);


/* //---trae todos los cultivos de un invernadero, activo e inactivo
//localhost:4000/greenHouse/:greenhouse_id/allCrops

router.get("/:greenhouse_id/allCrops", GreenHouseController.getAllCrops); */

module.exports = router;