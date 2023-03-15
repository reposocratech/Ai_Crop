var express = require('express');
var multerSingle = require('../../middleware/multerSingle')
const UserController = require('../../controllers/clientControllers/userControllers');
var router = express.Router();

// 1.Crear usuario(agricultor)
// localhost:4000/user/createUser
router.get('/createUser', UserController.createUser);
// TO DO: CARMBAR METODO A POST


// 2.-login
// localhost:4000/user/login
router.get("/login", UserController.login);
// TO DO: CARMBAR METODO A POST


//3.Ruta Editar un usuario(Agricultor)
//localhost:4000/user/editUser/:userId      
router.get("/editUser/:user_id", multerSingle("user"), UserController.editUser); 


//4.Borrado lógico de un usuario
//localhost:4000/user/deleteUser/:userId       
router.get("/deleteUser/:user_id", UserController.deleteUser);

module.exports = router;