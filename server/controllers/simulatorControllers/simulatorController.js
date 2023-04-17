const axios = require('axios');
var express = require('express');
var router = express.Router();
const connection = require('../../config/db');

class SimulatorController {

   // localhost:4000/simulator
   simulateData = (req, res) => {
      let greenhouse_id = req.body.selectedGreenhouse;
      let sql = '';

      if (req.body.datosForm) {
        
        // escribimos la consulta de forma dinámica de manera que se inserten en la BD los valores medidos.
        sql = `INSERT INTO measure (greenhouse_id, measurement_type_id, measure_value) VALUES  `;

        req.body.datosForm.temperature && (sql += `(${greenhouse_id}, 1, ${req.body.datosForm.temperature}), `);
        req.body.datosForm.co2 && (sql += `(${greenhouse_id}, 2, ${req.body.datosForm.co2}), `);
        req.body.datosForm.humidity && (sql += `(${greenhouse_id}, 3, ${req.body.datosForm.humidity}), `);
        req.body.datosForm.sunlight && (sql += `(${greenhouse_id}, 4, ${req.body.datosForm.sunlight}), `);
        req.body.datosForm.ph && (sql += `(${greenhouse_id}, 5, ${req.body.datosForm.ph}), `);
        req.body.datosForm.conductivity && (sql += `(${greenhouse_id}, 6, ${req.body.datosForm.conductivity}), `);
        req.body.datosForm.leaf_humidity && (sql += `(${greenhouse_id}, 7, ${req.body.datosForm.leaf_humidity}), `);

        sql = sql.slice(0, -2);

      } else {
        res.status(400).json({error: 'Formulario vacío'});
      }
      
      // ejecutamos la consulta y si la consulta es correcta, nos redirige al siguiente controlador de parámetros
      connection.query(sql, (error, result) => {
        error && res.json(error);

          axios
          .get(`http://localhost:4000/server/parameters/compare/${greenhouse_id}`)
          .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            }) 
          
          res.status(200).json(`EEXITO!!`);
      });
    };

    //2. get a list of all the greenhouses
    // localhost:4000/simulator/getGreenhousesList
    getGreenhousesList = (req, res) => {
      let sql = 'SELECT greenhouse.greenhouse_name, greenhouse.greenhouse_id, CONCAT(user.first_name, " ", user.last_name) as greenhouse_owner_full_name FROM greenhouse, user WHERE greenhouse.user_owner_id = user.user_id AND greenhouse_is_deleted = 0'

      connection.query(sql, (error, result) => {
        error 
        ? res.json(`Error en la consulta`)
        : res.status(200).json(result);
      });
    }
}

module.exports = new SimulatorController();
