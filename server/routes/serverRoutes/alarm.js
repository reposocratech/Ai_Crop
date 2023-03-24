var express = require('express');
const AlarmController = require('../../controllers/serverControllers/alarmControllers');
var router = express.Router();

//1. Crea una alarma
// localhost:4000/server/alarm/createAlarm
router.post('/createAlarm', AlarmController.createAlarm);

//2. Cierra la alarma indicada en la URL
// localhost:4000/server/alarm/closeAlarm/:alarm_id
router.get('/closeAlarm/:alarm_id', AlarmController.closeAlarm);

//3. Muestra TODAS las alarmas de un usuario indicado en la URL
// localhost:4000/server/alarm/seeAllAlarms/:user_id
router.get('/seeAllAlarms/:user_id', AlarmController.seeAllAlarms);

//4. Muestra las alarmas ACTIVAS de un usuario indicado en la URL
// localhost:4000/server/alarm/seeActiveAlarms/:user_id
router.get('/seeActiveAlarms/:user_id', AlarmController.seeActiveAlarms);

//5. Muestra TODAS las alarmas de un invernadero indicado en la URL
// localhost:4000/server/alarm/seeAllGreenhouseAlarms/:greenhouse_id
router.get('/seeAllGreenhouseAlarms/:greenhouse_id', AlarmController.seeAllGreenhouseAlarms);

// 6. Muestra las alarmas ACTIVAS de un invernadero indicado en la URL
// localhost:4000/server/alarm/seeAllGreenhouseAlarms/:greenhouse_id
router.get('/seeActiveGreenhouseAlarms/:greenhouse_id', AlarmController.seeActiveGreenhouseAlarms);

// 7. Muestra la última alarma de cada medida de un invernadero indicado en la URL
// localhost:4000/server/alarm/seeAlarmsByMeasure/:greenhouse_id
router.get('/seeAlarmsByMeasure/:greenhouse_id', AlarmController.seeAlarmsByMeasure);

module.exports = router;