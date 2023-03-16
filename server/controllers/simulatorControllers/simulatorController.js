class SimulatorController {

   // localhost:4000/simulator
  getSimulator = (req, res) => {
      // let datos = req.body.datosForm;
      // console.log(datos);

      let datos = {
         temperatura: 25,
         co2: 45
      }
      
      console.log("ESTE ES EL GET SIMULATOR");
      res.status(200).json(datos);
   };
};

module.exports = new SimulatorController();
