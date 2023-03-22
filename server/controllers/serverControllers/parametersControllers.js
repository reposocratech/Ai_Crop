var express = require('express');
var router = express.Router();
const connection = require('../../config/db');
const axios = require('axios');

class ParametersController {

    //1. 
    // localhost:4000/server/parameters/current/:greenhouse_id  
    getParameterHistory = (req, res) => {

        let greenhouse_id = req.params.greenhouse_id;
        let measurement_type = req.params.measurement_type;

        let sql = `SELECT measurement_type.measurement_type_id, greenhouse_measurement_type.max as max, greenhouse_measurement_type.min as min, measurement_type.measurement_type_name, measure.measure_value, measure.measure_date_time FROM greenhouse, greenhouse_measurement_type,measurement_type, measure WHERE greenhouse.greenhouse_id = 1 AND greenhouse.greenhouse_id = greenhouse_measurement_type.greenhouse_id AND greenhouse_measurement_type.measurement_type_id = measurement_type.measurement_type_id AND measurement_type.measurement_type_id = measure.measurement_type_id AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_id = ${greenhouse_id} ORDER BY measure_date_time desc LIMIT 1)`
        
        // buscamos en BD las medidas actuales del inveradero solicitado por req.params
        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.redirect(`http://localhost:4000/server/parameters/compare/${greenhouse_id}`);
        });

    }

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

            let {min, max, measure_value, measure_id} = result[0];

            // si la medida da fuera de los parámetros, ejecuta la ruta que crea alarma y le envio un objeto con los datos de la medida y la comparacion
            if (measure_value > max || measure_value < min){
                axios.post(`http://localhost:4000/server/alarm/createAlarm`, result[0])
                    .then(res => {
                        console.log("Se ha creado la alarma", result[0])
                    })
                    .catch(err => {
                        console.log("Fallo al crear la alarma", result[0])
                    })  
            }
            
        });

    }

}
module.exports = new ParametersController();