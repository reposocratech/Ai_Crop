const connection = require('../../config/db');

class AlarmController {
    //1. 
    // localhost:4000/
    createAlarm = (req, res) => {

        let {greenhouse_id, greenhouse_name, measurement_type_id, measurement_type_name, min, max, unit, measure_value, measure_id, measure_date_time} = req.body

        let alarm_message = "";
        let high_low = "";

        if (measure_value > max){
            alarm_message = `¡ALERTA! ${measurement_type_name} por encima del parámetro establecido de ${max} ${unit} en tu invernadero ${greenhouse_name}`;
            high_low = "high";
        }
        if (measure_value < min){
            alarm_message = `¡ALERTA! ${measurement_type_name} por debajo del parámetro establecido de ${min} ${unit} en tu invernadero ${greenhouse_name}`;
            high_low = "low";
        }

        let sql = `INSERT INTO alarm (measure_id, greenhouse_id, measurement_type_id, alarm_message, alarm_measure, high_low) VALUES 
		(${measure_id}, ${greenhouse_id}, ${measurement_type_id}, '${alarm_message}', ${measure_value}, '${high_low}')`;

        connection.query(sql, (error, result) => {
            error && res.status(400).json({ error });
            res.status(200).json("TODO OK")
            // let sqlAlarm = `SELECT * FROM alarm WHERE measure_id = ${measure_id}`;

            // connection.query(sqlAlarm, (error, resultAlarm) => {
            //     error && res.status(400).json({ error });
            //     let alarm_id = resultAlarm[0].alarm_id;
            //     res.redirect(`http://localhost:4000/server/email/get/${alarm_id}`)
            // })
        })
    }

}
module.exports = new AlarmController();