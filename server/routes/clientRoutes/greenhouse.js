var express = require('express');
const GreenhouseController = require('../../controllers/clientControllers/greenhouseControllers');

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


//3. see greenhouse info
// localhost:4000/greenhouse/details/:greenhouse_id
router.get('/details/:greenhouse_id', GreenhouseController.getGreenhouseInfo);


//--- trae la info de todos los invernaderos
    //localhost:4000/greenhouse/getAllGreenhouses/:user_owner_id
router.get("/getAllGreenhouses/:user_owner_id", GreenhouseController.getAllGreenhouses); 

// --- borrado lógico de colaborador
// localhost:4000/greenhouse/deleteGreenhouseCollaborator/:greenhouse_id/:user_id
router.get('/deleteGreenhouseCollaborator/:greenhouse_id/:user_id', GreenhouseController.deleteGreenhouseCollaborator);
 

module.exports = router;