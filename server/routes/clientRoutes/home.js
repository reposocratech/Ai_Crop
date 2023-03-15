var express = require('express');
const HomeController = require('../../controllers/clientControllers/homeControllers');
var router = express.Router();

// Home
// localhost:4000/
router.get('/', HomeController.getHome);


module.exports = router;