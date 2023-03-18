var express = require('express');
var router = express.Router();
const connection = require('../../config/db');
const axios = require('axios');

class ParametersController {

    //1. 
    // localhost:4000/server/parameters/1
    getParameters = (req, res) => {

        let greenhouse_id = req.params.greenhouse_id;

        let sql = `SELECT measurement_type.measurement_type_id, greenhouse_measurement_type.max as max, greenhouse_measurement_type.min as min, measurement_type.measurement_type_name, measure.measure_value, measure.measure_date_time FROM greenhouse, greenhouse_measurement_type,measurement_type, measure WHERE greenhouse.greenhouse_id = 1 AND greenhouse.greenhouse_id = greenhouse_measurement_type.greenhouse_id AND greenhouse_measurement_type.measurement_type_id = measurement_type.measurement_type_id AND measurement_type.measurement_type_id = measure.measurement_type_id AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_id = ${greenhouse_id} ORDER BY measure_date_time desc LIMIT 1);`
        
        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.redirect(`http://localhost:4000/server/parameters/compare/${greenhouse_id}`);

        });

    }

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

        connection.query(sql, (error, result) => {
            error && res.status(400).json({error});

            for(let i = 0; i < result.length; i++){

                let {min, max, measure_value, measure_id} = result[i];

                if (measure_value > max || measure_value < min){
                    axios.post(`http://localhost:4000/server/alarm/createAlarm`, result[i])
                        .then(response => {
                            
                        })
                        .catch(error => {
                            
                        })  
                }
            }
        });

    }

}
module.exports = new ParametersController();