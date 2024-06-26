var express = require('express');
const UserController = require('../../controllers/clientControllers/userControllers');
var router = express.Router();
const multerSingle = require("../../middleware/multerSingle")

//1.Crear usuario(agricultor)
// localhost:4000/user/createUser
router.post('/createUser', UserController.createUser);

// 1.2 Añadir colaborador recientemente creado al greenhouse indicado
// localhost:4000/user/user_greenhouse
router.post('/user_greenhouse', UserController.asignCollab)

//2. Editar usuario (agricultor)
// localhost:4000/user/editUser/:user_id
router.put("/editUser/:user_id", multerSingle("user"), UserController.editUser);

//3. Borrar usuario (borrado lógico)
// localhost:4000/user/editUser/:user_id
router.get('/deleteUser/:user_id', UserController.deleteUser);

//4. Login
// localhost:4000/user/login
router.post('/login', UserController.login);

//5. Change Password from settings
// localhost:4000/user/changePassword
router.post('/changePassword', UserController.changePasswordFromSettings);

//6. Retreive Password (envía un correo electrónico al correo introducido para confirmar el correo)
// localhost:4000/user/retreivePassword
router.post('/retreivePassword', UserController.passwordSendConfirmationEmail);

//6.1 Change Password from email (un endpoint al que se accede por un botón en un correo electrónico y que genera y envía una clave al azar)
// localhost:4000/user/generateRandomPassword/:email
router.get('/generateRandomPassword/:email', UserController.changePasswordFromEmail);

//7. Get one user
// localhost:4000/user/getOneUser/:user_id
router.get('/getOneUser/:user_id', UserController.getOneUser);

module.exports = router;