var express = require('express');
const GreenhouseController = require('../../controllers/clientControllers/greenhouseControllers');

var router = express.Router();

//1. create greenhouse
// localhost:4000/greenhouse/createGreenhouse
router.post('/createGreenhouse', GreenhouseController.createGreenhouse);


//2. edit greenhouse
// localhost:4000/greenhouse/editGreenhouse
router.put('/editGreenhouse/:greenhouse_id', GreenhouseController.editGreenhouse);


//3. see greenhouse info by gh ID
// localhost:4000/greenhouse/details/:greenhouse_id
router.get('/details/:greenhouse_id', GreenhouseController.getGreenhouseDetails);


//4. trae la info de todos los invernaderos que tengo o colaboro
//localhost:4000/greenhouse/getAllGreenhouses/:user_owner_id
router.get("/getAllGreenhouses/:user_id", GreenhouseController.getAllGreenhouses); 


//5. borrado lógico de un Invernadero
//localhost:4000/greenhouse/deleteGreenhouse/:greenhouse_id
router.get("/deleteGreenhouse/:greenhouse_id", GreenhouseController.deleteGreenhouse);

// 6. Invita a un colaborador
// localhost:4000/greenhouse/inviteCollaborator
router.post('/inviteCollaborator', GreenhouseController.inviteGreenhouseCollaborator);

// 7. borrado REAL de colaborador
// localhost:4000/greenhouse/deleteGreenhouseCollaborator/:greenhouse_id/:user_id
router.get('/deleteGreenhouseCollaborator/:greenhouse_id/:user_id', GreenhouseController.deleteGreenhouseCollaborator);

// 8. crear un helper
// localhost:4000/greenhouse/createHelper/:greenhouse_id
router.get('/createHelper/:greenhouse_id', GreenhouseController.createHelper);

// 9. borrado REAL  de un helper
// localhost:4000/greenhouse/deleteHelper/:helper_id
router.get('/deleteHelper/:helper_id', GreenhouseController.deleteHelper);

// 10. pedido de medidas actuales
// localhost:4000/greenhouse/getCurrentMeasures/:greenhouse_id
router.get('/getCurrentMeasures/:greenhouse_id', GreenhouseController.getCurrentMeasures);

// 11. pedido de medidas históricas
// localhost:4000/greenhouse/getAllMeasures/:greenhouse_id
router.get('/getAllMeasures/:greenhouse_id', GreenhouseController.getAllMeasures);

//12. see greenhouse info by gh name
// localhost:4000/greenhouse/details/:greenhouse_name
router.get('/detailsName/:greenhouse_name', GreenhouseController.getGreenhouseDetailsByName);

module.exports = router;