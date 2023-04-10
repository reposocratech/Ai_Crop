var express = require('express');
const AdminController = require('../../controllers/clientControllers/adminControllers');
var router = express.Router();

//1. disable user 
// localhost:4000/admin/disableUser/:user_id
router.get('/disableUser/:user_id', AdminController.disableUser);

//2. Enable user
// localhost:4000/admin/enableUser/:user_id
router.get('/enableUser/:user_id', AdminController.enableUser);

//3. Select all users
// localhost:4000/admin/allUsers
router.get('/allUsers', AdminController.selectAllUsers);

//4. See the info of one user
//localhost:4000/admin/oneUser/:search
router.get("/oneUser/:search", AdminController.selectOneUser);

module.exports = router;