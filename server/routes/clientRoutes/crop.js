var express = require('express');
const CropController = require('../../controllers/clientControllers/cropControllers');
var router = express.Router();

// 1. Crea un nuevo cultivo
// localhost:4000/crop/createCrop
router.post('/createCrop', CropController.createCrop);

// 2. Edit Crop
// localhost:4000/crop/editCrop/:crop_id
router.post('/editCrop/:crop_id', CropController.editCrop);
// FALTA TESTEAR!!!

// 3. Borra de manera logica un cultivo
//localhost:4000/crop/deletedCrop/:crop_id
router.get('/logicDeleteCrop/:crop_id', CropController.deleteCrop);

// 3.1 Borrado REAL de un cultivo
//localhost:4000/crop/deletedCrop/:crop_id
router.delete('/deleteCrop/:crop_id', CropController.deleteCrop);

// 4. Desactiva Crop
//localhost:4000/crop/endCrop/:crop_id
router.get('/endCrop/:crop_id', CropController.endCrop);

// 5. Activa Crop
//localhost:4000/crop/endCrop/:crop_id
router.get('/activateCrop/:crop_id', CropController.activateCrop);

// 6.  trae todos los cultivos de un invernadero, activo e inactivo
//localhost:4000/crop/getAllCrops/:greenhouse_id
router.get('/getAllCrops/:greenhouse_id', CropController.getAllCrops);

// 7?.  trae los cultivos de un invernadero (activo)
 //localhost:4000/crop/getActiveCrops/:greenhouse_id
 router.get('/getActiveCrops/:greenhouse_id', CropController.getActiveCrops);




module.exports = router;