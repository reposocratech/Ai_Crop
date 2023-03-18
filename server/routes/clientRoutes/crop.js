var express = require('express');
const CropController = require('../../controllers/clientControllers/cropControllers');
var router = express.Router();

// 1. Crea un nuevo cultivo
// localhost:4000/crop/createCrop
router.get('/createCrop', CropController.createCrop);
// CAMBIAR METODO A POST

// 2. Edit Crop
// localhost:4000/crop/editCrop/:crop_id
router.post('/editCrop/:crop_id', CropController.editCrop);
// FALTA TESTEAR!!!

// 3. Delete Crop
//localhost:4000/crop/deletedCrop/:crop_id
router.get('/deleteCrop/:crop_id', CropController.deleteCrop);

// 4. Desactiva Crop
//localhost:4000/crop/endCrop/:crop_id
router.get('/endCrop/:crop_id', CropController.endCrop);

// 5. Activa Crop
//localhost:4000/crop/endCrop/:crop_id
router.get('/activateCrop/:crop_id', CropController.activateCrop);

// 6?.  trae todos los cultivos de un invernadero, activo e inactivo
 //localhost:4000/crop/getAllCrops/:greenhouse_id
router.get('/getAllCrops/:greenhouse_id', CropController.getAllCrops);

// 7?.  trae los cultivos de un invernadero (activo)
 //localhost:4000/crop/getActiveCrops/:greenhouse_id
 router.get('/getActiveCrops/:greenhouse_id', CropController.getActiveCrops);




module.exports = router;