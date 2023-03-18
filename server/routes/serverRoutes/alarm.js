var express = require('express');
const AlarmController = require('../../controllers/serverControllers/alarmControllers');
var router = express.Router();

//1. 
// localhost:4000/server/alarm/createAlarm
router.post('/createAlarm', AlarmController.createAlarm);

module.exports = router;