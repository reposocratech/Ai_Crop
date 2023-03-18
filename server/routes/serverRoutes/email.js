var express = require('express');
const EmailController = require('../../controllers/serverControllers/emailControllers');
var router = express.Router();

//1. Gets a list of emails that are related to an alarm
// localhost:4000/server/email/get/:alarm_id
// router.get('/get/:alarm_id', EmailController.getAlarmEmails);

//2. Sends the emails
// localhost:4000/server/email/send/:alarm_id
// router.get('/send/:alarm_id', EmailController.sendAlarmEmails);

module.exports = router;