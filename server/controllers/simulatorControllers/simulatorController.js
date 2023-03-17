const connection = require('../../config/db');

class SimulatorController {

   // localhost:4000/simulator
   simulateData = (req, res) => {

      let {greenhouse_id, temperatura, co2, humedad, luz_solar} = req.body.datosForm;

      let sql = `INSERT INTO measure (greenhouse_id, measurement_type_id, measure_value) VALUES 
      (${greenhouse_id}, 1, ${temperatura})`;

      req.body.datosForm.co2 && (sql += ` ,(${greenhouse_id}, 2, ${co2})`);
      req.body.datosForm.humedad && (sql += ` ,(${greenhouse_id}, 3, ${humedad})`);
      req.body.datosForm.luz_solar && (sql += ` ,(${greenhouse_id}, 4, ${luz_solar})`);
      req.body.datosForm.ph && (sql += ` ,(${greenhouse_id}, 5, ${ph})`);
      req.body.datosForm.ce && (sql += ` ,(${greenhouse_id}, 6, ${ce})`);
      req.body.datosForm.humedad_hoja && (sql += ` ,(${greenhouse_id}, 7, ${humedad_hoja})`);

      connection.query(sql, (error, result) => {
         error
         ? res.status(400).json({error})
         : res.status(200).json(result);
     });

   };
};

module.exports = new SimulatorController();
