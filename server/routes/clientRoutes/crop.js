var express = require('express');
const CropController = require('../../controllers/clientControllers/cropControllers');
var router = express.Router();

// 1. Crea un nuevo cultivo
// localhost:4000/crop/createCrop
router.get('/createCrop', CropController.createCrop);
// CAMBIAR METODO A POST


module.exports = router;