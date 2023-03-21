const connection = require('../../config/db');
const axios = require('axios');

class AlarmController {
    //1. Crea una alarma
    // localhost:4000/server/alarm/createAlarm
    createAlarm = (req, res) => {

        let {greenhouse_id, greenhouse_name, measurement_type_id, measurement_type_name, min, max, unit, measure_value, measure_id, measure_date_time} = req.body

        let alarm_message = "";
        let high_low = "";

        // Si la medida supera al parámetro máximo
        if (measure_value > max){
            alarm_message = `¡ALERTA! ${measurement_type_name} por encima del parámetro establecido de ${max} ${unit} en tu invernadero ${greenhouse_name}`;
            high_low = "high";
        }

        // si la medida es inferior al parámetro mínimo
        if (measure_value < min){
            alarm_message = `¡ALERTA! ${measurement_type_name} por debajo del parámetro establecido de ${min} ${unit} en tu invernadero ${greenhouse_name}`;
            high_low = "low";
        }

        let sql = `INSERT INTO alarm (measure_id, greenhouse_id, measurement_type_id, alarm_message, alarm_measure, high_low) VALUES (${measure_id}, ${greenhouse_id}, ${measurement_type_id}, '${alarm_message}', ${measure_value}, '${high_low}')`;

        // ejecuta el insert (crea alarma)
        connection.query(sql, (error, result) => {
            error && res.status(400).json({ error });

            let sqlAlarm = `SELECT alarm_id FROM alarm WHERE measure_id = ${measure_id}`;

            // buscamos en BD la alarma recientemente creada (buscamos por measure ID ya que por cada medida va a haber una o ninguna alarma) y guardamos los resultados en un objeto "resultAlarma"
            connection.query(sqlAlarm, (error, resultAlarm) => {
                error && res.status(400).json({ error });
                let alarm_id = resultAlarm[0].alarm_id;
                console.log("ALARM LINEA 38 -- TODO OK", resultAlarm[0].alarm_id)

                error 
                ? res.json(`Error en la consulta`)
                : res.redirect(`http://localhost:4000/server/email/getAlarmEmails/${alarm_id}`);
                // si todo fue bien, nos redirije al siguiente end point al que le mandamos por params el alarm_id
            })
        })
    }

    closeAlarm = (req, res) => {   

        let {alarm_id, message}= req.params;
        let sql = `UPDATE alarm SET is_active = 1, alarm_closing_message = "${message}" WHERE alarm_id = ${alarm_id}`;

        connection.query(sql, (error, result) => {
            error 
            ? res.json(`Error en la consulta`)
            : res.json(`La alarma ${alarm_id} se ha desactivado. Mesange de cierre: ${message}`);
        });
    }

    seeAllAlarms = (req, res) => {   
        let user_id = req.params.user_id;

        let sql = `SELECT alarm.* FROM alarm, user_greenhouse, user
        WHERE user.user_id = ${user_id} AND alarm.greenhouse_id = user_greenhouse.greenhouse_id AND user_greenhouse.user_id = user.user_id`

        connection.query(sql, (error, result) => {
            error 
            ? res.json(`Error en la consulta`)
            : res.status(201).json(result);
        });
    }

    seeActiveAlarms = (req, res) => {   
        let user_id = req.params.user_id;

        let sql = `SELECT alarm.* FROM alarm, user_greenhouse, user
        WHERE user.user_id = ${user_id} AND alarm.greenhouse_id = user_greenhouse.greenhouse_id AND user_greenhouse.user_id = user.user_id AND alarm.is_active = 1`

        connection.query(sql, (error, result) => {
            error 
            ? res.json(`Error en la consulta`)
            : res.status(201).json(result);
        });
    }

    seeAllGreenhouseAlarms = (req, res) => {   
        let greenhouse_id = req.params.greenhouse_id;

        let sql = `SELECT alarm.* FROM alarm, user_greenhouse, user
        WHERE alarm.greenhouse_id = user_greenhouse.greenhouse_id AND user_greenhouse.user_id = user.user_id AND alarm.greenhouse_id = ${greenhouse_id}`

        connection.query(sql, (error, result) => {
            error 
            ? res.json(`Error en la consulta`)
            : res.status(201).json(result);
        });
    }

    seeActiveGreenhouseAlarms = (req, res) => {   
        let greenhouse_id = req.params.greenhouse_id;

        let sql = `SELECT alarm.* FROM alarm, user_greenhouse, user
        WHERE alarm.greenhouse_id = user_greenhouse.greenhouse_id AND user_greenhouse.user_id = user.user_id AND alarm.is_active = 1 and alarm.greenhouse_id = ${greenhouse_id}`

        connection.query(sql, (error, result) => {
            error 
            ? res.json(`Error en la consulta`)
            : res.status(201).json(result);
        });
    }

}
module.exports = new AlarmController();