var express = require('express');
const UserController = require('../../controllers/clientControllers/userControllers');
var router = express.Router();

// localhost:4000/user/createUser
router.post('/createUser', UserController.createUser);

module.exports = router;