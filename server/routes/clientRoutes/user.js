var express = require('express');
const UserController = require('../../controllers/clientControllers/userControllers');
var router = express.Router();

// localhost:4000/user/createUser
router.get('/createUser', UserController.createUser);

module.exports = router;