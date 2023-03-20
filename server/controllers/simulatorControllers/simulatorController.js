var express = require('express');
var router = express.Router();
const connection = require('../../config/db');
const ParametersControllers = require('../serverControllers/parametersControllers');

class SimulatorController {

   // localhost:4000/simulator
   simulateData = (req, res) => {
      let greenhouse_id = req.body.greenhouse.greenhouse_id;
      let sql = '';

      if (req.body.datosForm) {
    
        // escribimos la consulta de forma dinámica de manera que se inserten en la BD los valores medidos.
        sql = `INSERT INTO measure (greenhouse_id, measurement_type_id, measure_value) VALUES `;

        req.body.datosForm.temperatura && (sql += `(${greenhouse_id}, 1, ${req.body.datosForm.temperatura}), `);
        req.body.datosForm.co2 && (sql += `(${greenhouse_id}, 2, ${req.body.datosForm.co2}), `);
        req.body.datosForm.humedad && (sql += `(${greenhouse_id}, 3, ${req.body.datosForm.humedad}), `);
        req.body.datosForm.luz_solar && (sql += `(${greenhouse_id}, 4, ${req.body.datosForm.luz_solar}), `);
        req.body.datosForm.ph && (sql += `(${greenhouse_id}, 5, ${req.body.datosForm.ph}), `);
        req.body.datosForm.ce && (sql += `(${greenhouse_id}, 6, ${req.body.datosForm.ce}), `);
        req.body.datosForm.humedad_hoja && (sql += `(${greenhouse_id}, 7, ${req.body.datosForm.humedad_hoja}), `);

        sql = sql.slice(0, -2);

      } else {
        res.status(400).json({error: 'Formulario vacío'});
      }
      
      // ejecutamos la consulta y si la consulta es correcta, nos redirige al siguiente controlador de parámetros
      connection.query(sql, (error, result) => {
        error 
        ? res.json(`Error en la consulta`)
        : res.redirect(`http://localhost:4000/server/parameters/compare/${greenhouse_id}`);
      });
    };
}

module.exports = new SimulatorController();
