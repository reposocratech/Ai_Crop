const connection = require('../../config/db');

class SimulatorController {

   // localhost:4000/simulator
  simulateData = (req, res) => {
      let sql = "";

      if (req.body.datosForm.ph){
         let  {greenhouse_id, temperatura, co2, humedad, luz_solar, ph, ce, humedad_hoja} = req.body.datosForm;

         sql = `INSERT INTO measure (greenhouse_id, measurement_type_id, measure_value) VALUES 
         (${greenhouse_id}, 1, ${temperatura}),(${greenhouse_id}, 2, ${co2}),(${greenhouse_id}, 3, ${humedad}),(${greenhouse_id}, 4, ${luz_solar}),(${greenhouse_id}, 5, ${ph}),(${greenhouse_id}, 6, ${ce}),(${greenhouse_id}, 7, ${humedad_hoja})`;

      } else {
         let  {greenhouse_id, temperatura, co2, humedad, luz_solar} = req.body.datosForm;

         sql = `INSERT INTO measure (greenhouse_id, measurement_type_id, measure_value) VALUES 
         (${greenhouse_id}, 1, ${temperatura}),(${greenhouse_id}, 2, ${co2}),(${greenhouse_id}, 3, ${humedad}),(${greenhouse_id}, 4, ${luz_solar})`;
      }

      console.log(req.body.datosForm);

      console.log("ESTE ES EL POST SIMULATOR")


      connection.query(sql, (error, result) => {
         error
         ? res.status(400).json({error})
         : res.status(200).json(result);
     });


   };
};

module.exports = new SimulatorController();
