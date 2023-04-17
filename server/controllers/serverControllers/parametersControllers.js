const connection = require('../../config/db');
const axios = require('axios');

class ParametersController {

    //1. Compara los parámetros establecidos en el greenhouse con las últimas medidas que obtuvo
    // localhost:4000/server/parameters/compare/:greenhouse_id 
    compareParameters = (req, res) => {

        let greenhouse_id = req.params.greenhouse_id;

        let sql = `SELECT greenhouse.greenhouse_id, greenhouse.greenhouse_name, greenhouse_measurement_type.measurement_type_id, measurement_type.measurement_type_name, greenhouse_measurement_type.min, greenhouse_measurement_type.max, measurement_type.unit, measure.measure_value, measure.measure_id, measure.measure_date_time
        FROM greenhouse, greenhouse_measurement_type, measurement_type, measure
        WHERE greenhouse.greenhouse_id = greenhouse_measurement_type.greenhouse_id
        AND greenhouse_measurement_type.measurement_type_id = measurement_type.measurement_type_id
        AND measure.greenhouse_id = greenhouse.greenhouse_id
        AND greenhouse.greenhouse_id = ${greenhouse_id}
        AND measure.measurement_type_id = measurement_type.measurement_type_id
        AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_id = ${greenhouse_id} ORDER BY measure_date_time desc LIMIT 1)`

        // Buscamos en BD todos los parámetros establecidos para el invernadero solicitado por req.params y las últimas medidas que obtuvo. Guardamos los resultados en un objeto llamado "result"
        connection.query(sql, (error, result) => {
            error && res.status(400).json({error});

            // por cada medida, comparamos el valor con los parámetros establecidos. 
            for(let i = 0; i < result.length; i++){
                let {min, max, measure_value} = result[i];

                // si la medida da fuera de los parámetros, ejecuta la ruta que crea alarma y le envio un objeto con los datos de la medida y la comparacion
                if (measure_value > max || measure_value < min){
                    axios.post(`http://localhost:4000/server/alarm/createAlarm`, result[i])
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => {
                            console.log(err)
                        })  
                }
            }            
        });

    }

    // 2. Muestra la última medida de un parámetro específico de un greenhouse específico
    // localhost:4000/server/parameters/current/:greenhouse_id/:measurement_type_id
    getMeasureDetails = (req, res) => {

        let {greenhouse_id, measurement_type_id} = req.params;

        // nombre de la medida, medida actual, fecha, alerta, nombre del inv, max, min
 
        let sql = `SELECT measure.measure_value, measure.measure_date_time, greenhouse_measurement_type.min, greenhouse_measurement_type.max, measurement_type.measurement_type_name, measurement_type.unit, greenhouse.greenhouse_name 
        FROM measure, measurement_type, greenhouse_measurement_type, greenhouse
        WHERE measure.measurement_type_id = measurement_type.measurement_type_id
        AND greenhouse_measurement_type.measurement_type_id = measurement_type.measurement_type_id
        AND greenhouse_measurement_type.greenhouse_id = greenhouse.greenhouse_id
        AND greenhouse.greenhouse_id = ${greenhouse_id}
        AND measure.measurement_type_id = ${measurement_type_id}
        ORDER BY measure.measure_date_time DESC
        LIMIT 1`
        
        // buscamos en BD las medidas actuales del inveradero solicitado por req.params
        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.status(200).json(result);
        });
    }

    
    // 3. Muestra el historial completo de una medida
    // localhost:4000/server/parameters/history/:greenhouse_id/:measurement_type_id
    getMeasureHistory = (req, res) => {

        let {greenhouse_id, measurement_type_id} = req.params;

        let sql = `SELECT UNIX_TIMESTAMP(measure_date_time) * 1000 as x, measure_value as y FROM measure WHERE greenhouse_id = ${greenhouse_id} 
        AND measurement_type_id = ${measurement_type_id} 
        AND DATE(measure_date_time) >= DATE(NOW()) - INTERVAL 1 YEAR
        ORDER BY x DESC`

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.status(200).json(result);
        });
    }
    
}
module.exports = new ParametersController();