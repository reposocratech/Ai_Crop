const connection = require('../config/db');

const getMeasurements = (greenhouse_id) => {
    
    let sqlMeasure = `SELECT measure.*, measurement_type.measurement_type_name  from measure, measurement_type WHERE measure.measurement_type_id = measurement_type.measurement_type_id AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_id = ${greenhouse_id} ORDER BY measure_date_time desc LIMIT 1) ORDER BY measure_id asc;`;
    
    connection.query(sqlMeasure, (error, result) => {
        error
        ? res.status(400).json({error})
        : res.status(201).json({result});
    });
}

module.exports = getMeasurements();