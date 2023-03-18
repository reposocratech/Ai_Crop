const connection = require('../../config/db');

class GreenhouseController {

    //Inserta en base de datos, nuevo invernadero
    //localhost:4000/greenhouse/createGreenhouse
    createGreenhouse = (req, res) => {
        //TO DO:
        // DESCOMENTAR el destructuring del req.body
        // BORRAR el objeto "newGreenhouse"
        // CAMBIAR sql para usar los datos del req.body destructurado
        // BORRAR consoleLogs
    
            // let {user_owner_id, greenhouse_name, greenhouse_location, greenhouse_latitude, greenhouse_longitude, greenhouse_orientation, greenhouse_type, greenhouse_size} = req.body;

            // let sql = `INSERT INTO greenhouse (user_owner_id, greenhouse_name, greenhouse_location, greenhouse_latitude, greenhouse_longitude, greenhouse_orientation, greenhouse_type, greenhouse_size) VALUES ("${user_owner_id}", "${greenhouse_name}", "${greenhouse_location}", ${greenhouse_latitude}, "${greenhouse_longitude}", "${greenhouse_orientation}", "${greenhouse_type}", "${greenhouse_size}")`;
    
            let newGH = {
                user_owner_id: 1,
                greenhouse_name: "Invernadero Zamora 1",
                greenhouse_location: "Zamora",
                greenhouse_latitude: 3.45678,
                greenhouse_longitude: 26.12345,
                greenhouse_orientation: "SO",
                greenhouse_type: 2,
                greenhouse_size: 50
            }
    
            let sql = `INSERT INTO greenhouse (user_owner_id, greenhouse_name, greenhouse_location, greenhouse_latitude, greenhouse_longitude, greenhouse_orientation, greenhouse_type, greenhouse_size) VALUES (${newGH.user_owner_id}, '${newGH.greenhouse_name}', '${newGH.greenhouse_location}', ${newGH.greenhouse_latitude}, ${newGH.greenhouse_longitude}, '${newGH.greenhouse_orientation}', ${newGH.greenhouse_type}, ${newGH.greenhouse_size})`;
    
            connection.query(sql, (error, result) => {
                error
                ? res.status(400).json({error})
                : res.status(201).json("SE CREó BIEN EL INVERNADERO");
            });
        };


    // 2.Edit Greenhouse
    // localhost:4000/greenhouse/editGreenhouse/:greenhouse_id
    editGreenhouse = (req, res) => {
    
        const { greenhouse_name, greenhouse_location, greenhouse_orientation, greenhouse_type, greenhouse_size, greenhouse_create_date, greenhouse_latitude, greenhouse_longitude } = req.body;
        
        const greenhouse_id = req.params.greenhouse_id;
        
        let sql = `UPDATE greenhouse SET greenhouse_name ='${greenhouse_name}', greenhouse_location ='${greenhouse_location}', greenhouse_orientation = '${greenhouse_orientation}', greenhouse_type = '${greenhouse_type}', greeenhouse_size = '${greenhouse_size}', greenhouse_create_date = '${greenhouse_create_date}', greenhouse_latitude = '${greenhouse_latitude}', greenhouse_longitude = '${greenhouse_longitude}'  WHERE travel_id = ${travel_id}`;
        
        connection.query(sql, (error, result) => {
          error 
          ? res.status(400).json({ error }) 
          : res.status(200).json(result);
        });
      };


    //3. see greenhouse info
    // localhost:4000/greenhouse/details/:greenhouse_id
    getGreenhouseInfo = (req, res) => {
    
        const greenhouse_id = req.params.greenhouse_id;

        let sqlGreenhouse = `SELECT greenhouse.*, count(user.user_id) as collaborator_count FROM greenhouse JOIN user_greenhouse ON user_greenhouse.greenhouse_id = greenhouse.greenhouse_id JOIN user ON user_greenhouse.user_id = user.user_id WHERE greenhouse.greenhouse_id = ${greenhouse_id} GROUP BY greenhouse.greenhouse_name;`;

        connection.query(sqlGreenhouse, (error, resultGreenhouse) => {
            if (error){
                res.status(400).json({ error }) 
            } 

            let sqlMeasure = `SELECT measure.*, measurement_type.measurement_type_name  from measure, measurement_type WHERE measure.measurement_type_id = measurement_type.measurement_type_id AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_id = ${greenhouse_id} ORDER BY measure_date_time desc LIMIT 1)
            ORDER BY measure_id asc;`;

            connection.query(sqlMeasure, (error, resultMeasure) => {
                if (error){
                    res.status(400).json({ error }) 
                } 
    
                let sqlCrop = `select * from crop WHERE greenhouse_id = ${greenhouse_id} and is_active = 1`;

                connection.query(sqlCrop, (error, resultActiveCrops) => {
                    error && res.status(400).json({ error });

                    let sqlParameters = `select greenhouse_measurement_type.*, measurement_type.measurement_type_name 
                    FROM greenhouse_measurement_type, measurement_type 
                    WHERE greenhouse_measurement_type.greenhouse_measurement_type_id = measurement_type.measurement_type_id 
                    AND greenhouse_id = ${greenhouse_id}`;

                    connection.query(sqlParameters, (error, resultParameters) => {
                        error && res.status(400).json({ error });
                    
                        let sqlActiveAlarms = `SELECT * FROM alarm WHERE is_active = 1 AND greenhouse_id = ${greenhouse_id}`;

                        connection.query(sqlActiveAlarms, (error, resultActiveAlarms) => {
                            error 
                            ? res.status(400).json({ error })
                            : res.status(200).json({ resultGreenhouse, resultMeasure, resultActiveCrops, resultParameters, resultActiveAlarms });    
                        })    
                    });
                });
            });
        });
    }
    
     //--- trae la info de todos los invernaderos
    //localhost:4000/greenhouse/getAllGreenhouses/:user_owner_id
    getAllGreenhouses = (req, res) => {

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

module.exports = new GreenhouseController();

