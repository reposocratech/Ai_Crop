var express = require('express');
var router = express.Router();
const connection = require('../../config/db');
const ParametersControllers = require('../serverControllers/parametersControllers');

class SimulatorController {

   // localhost:4000/simulator
   simulateData = (req, res) => {

      let {greenhouse_id, temperatura} = req.body.datosForm;

      let sql = `INSERT INTO measure (greenhouse_id, measurement_type_id, measure_value) VALUES 
      (${greenhouse_id}, 1, ${temperatura})`;

      req.body.datosForm.co2 && (sql += `, (${greenhouse_id}, 2, ${req.body.datosForm.co2})`);
      req.body.datosForm.humedad && (sql += `, (${greenhouse_id}, 3, ${req.body.datosForm.humedad})`);
      req.body.datosForm.luz_solar && (sql += `, (${greenhouse_id}, 4, ${req.body.datosForm.luz_solar})`);
      req.body.datosForm.ph && (sql += `, (${greenhouse_id}, 5, ${req.body.datosForm.ph})`);
      req.body.datosForm.ce && (sql += `, (${greenhouse_id}, 6, ${req.body.datosForm.ce})`);
      req.body.datosForm.humedad_hoja && (sql += `, (${greenhouse_id}, 7, ${req.body.datosForm.humedad_hoja})`);

      connection.query(sql, (error, result) => {
         error 
         ? res.status(400).json(error)
         : res.redirect(`http://localhost:4000/server/parameters/current/${greenhouse_id}`);
     });

   };
}

module.exports = new SimulatorController();
