const connection = require('../../config/db');

class GreenHouseController{

    

    //--- trae la info de todos los invernaderos
    //localhost:4000/greenHouse/getAllGreenHouses/:user_owner_id
    getAllGreenHouses = (req, res) => {

        //queremos todos los invernaderos o los invernaderos no borrados?

        const user_owner_id = req.params.user_owner_id;
        let sql = ` SELECT * FROM greenhouse where user_owner_id = ${user_owner_id};`;
        
        connection.query(sql, (error, result) => {

        error ? res.status(400).json({ error }) : res.status(201).json(result);
        console.log(result);
        //console.log(res,"jfhskjghdjkfghsdfjkg");
        });

    };


    /* //--------------------voy por aquí--------------------------

    //--- trae todos los cultivos de un invernadero, activo e inactivo
    //localhost:4000/greenHouse/:greenhouse_id/allCrops
    getAllCrops = (req, res) => {

        const user_owner_id = req.params.user_owner_id;
        let sql = ` SELECT * FROM greenhouse where user_owner_id = ${user_owner_id};`;
        console.log(res);
        connection.query(sql, (error, result) => {
        error ? res.status(400).json({ error }) : res.status(201).json(result);
        
        });

    };
    */
}
 console.log("holaaaaa");
module.exports = new GreenHouseController();