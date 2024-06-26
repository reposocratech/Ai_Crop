var express = require('express');
const EmailController = require('../../controllers/serverControllers/notificationControllers');
var router = express.Router();

// 1. Trae una lista de correos asociados a un invernadero
// localhost:4000/server/notification/getAlarmEmails/:alarm_id
router.get('/getAlarmEmails/:alarm_id', EmailController.getAlarmEmails);

//2. Crea notificaciones
// localhost:4000/server/notification/createNotifications/:alarm_id
router.post('/createNotifications/:alarm_id', EmailController.createNotifications);

//3. Envia los emails
// localhost:4000/server/notification/sendEmail/:alarm_id
router.post('/sendEmail/:alarm_id', EmailController.sendNotificationEmails);
// FALTA NODEMAILER

//4. Borrar una notificacion
// localhost:4000/server/notification/deleteNotification/:notification_id
router.get('/deleteNotification/:notification_id', EmailController.deleteNotification);
// FALTA NODEMAILER

//5. Ver todas las notificaciones de un usuario enviado por URL
// localhost:4000/server/notification/seeAllNotifications/:user_id
router.post('/seeAllNotifications/:user_id', EmailController.seeAllNotifications);
// TERMINAR

module.exports = router;