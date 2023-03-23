const connection = require('../../config/db');

class GreenhouseController {

    //1. Inserta en base de datos un nuevo invernadero
    //localhost:4000/greenhouse/createGreenhouse
    createGreenhouse = (req, res) => {
    
        let {user_owner_id, greenhouse_name, greenhouse_location, greenhouse_latitude, greenhouse_longitude, greenhouse_orientation, greenhouse_type, greenhouse_size} = req.body;

        let sql = `INSERT INTO greenhouse (user_owner_id, greenhouse_name, greenhouse_location, greenhouse_latitude, greenhouse_longitude, greenhouse_orientation, greenhouse_type, greenhouse_size) VALUES ("${user_owner_id}", "${greenhouse_name}", "${greenhouse_location}", ${greenhouse_latitude}, "${greenhouse_longitude}", "${greenhouse_orientation}", "${greenhouse_type}", "${greenhouse_size}")`;

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
        
        let sql = `UPDATE greenhouse SET greenhouse_name ='${greenhouse_name}', greenhouse_location ='${greenhouse_location}', greenhouse_orientation = '${greenhouse_orientation}', greenhouse_type = '${greenhouse_type}', greeenhouse_size = '${greenhouse_size}', greenhouse_create_date = '${greenhouse_create_date}', greenhouse_latitude = '${greenhouse_latitude}', greenhouse_longitude = '${greenhouse_longitude}'  WHERE greenhouse_id = ${greenhouse_id}`;
        
        connection.query(sql, (error, result) => {
          error 
          ? res.status(400).json({ error }) 
          : res.status(200).json(`El invernadero ${greenhouse_id} ha sido actualizado`);
        });
      };


    //3. see greenhouse info
    // localhost:4000/greenhouse/details/:greenhouse_id
    getGreenhouseDetails = (req, res) => {
    
        const greenhouse_id = req.params.greenhouse_id;

        let sqlGreenhouse = `SELECT greenhouse.*, count(user.user_id) as collaborator_count FROM greenhouse LEFT JOIN user_greenhouse ON user_greenhouse.greenhouse_id = greenhouse.greenhouse_id LEFT JOIN user ON user_greenhouse.user_id = user.user_id WHERE greenhouse.greenhouse_id = ${greenhouse_id} GROUP BY greenhouse.greenhouse_name;`;

        // buscamos en BD todos los greenhouses que coincidan con el que se nos pasa por parámetros, y le pedimos que nos diga cuántos colaboradores tiene asociados (left join por si no tiene colaboradores) y guardamos los resultados en el objeto "resultGreenhouse"
        connection.query(sqlGreenhouse, (error, resultGreenhouse) => {
            if (error){
                res.status(400).json({ error }) 
            } 

            let sqlMeasure = `SELECT measure.*, measurement_type.measurement_type_name  from measure, measurement_type WHERE measure.measurement_type_id = measurement_type.measurement_type_id AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_id = ${greenhouse_id} ORDER BY measure_date_time desc LIMIT 1)
            ORDER BY measure_id asc;`;

            // buscamos en BD las últimas medidas que tiene registado el invernadero (con una subconsulta) y las guardamos en el objeto "resultMeasure"
            connection.query(sqlMeasure, (error, resultMeasure) => {
                if (error){
                    res.status(400).json({ error }) 
                } 
    
                let sqlCrop = `SELECT * FROM crop WHERE greenhouse_id = ${greenhouse_id} AND is_active = 1`;

                // buscamos en BD todos los crops activos que tiene el invernadero enviado por params y guardamos los resultados en el objeto "resultActiveCrops"
                connection.query(sqlCrop, (error, resultActiveCrops) => {
                    error && res.status(400).json({ error });

                    let sqlParameters = `SELECT greenhouse_measurement_type.*, measurement_type.measurement_type_name, measurement_type.unit 
                    FROM greenhouse_measurement_type, measurement_type 
                    WHERE greenhouse_measurement_type.measurement_type_id = measurement_type.measurement_type_id 
                           AND greenhouse_id = ${greenhouse_id}`;

                    // buscamos en BD los parámetros que tiene seleccionados el invernadero para cada medida y los guardamos en el objeto "result parameters"
                    connection.query(sqlParameters, (error, resultParameters) => {
                        error && res.status(400).json({ error });
                    
                        let sqlActiveAlarms = `SELECT * FROM alarm WHERE is_active = 1 AND greenhouse_id = ${greenhouse_id}`;

                        // buscamos en BD las alarmas acvtivas que tiene el invernadero y guardamos los resultados en el objeto "resultActiveAlarms"
                        connection.query(sqlActiveAlarms, (error, resultActiveAlarms) => {
                            error 
                            ? res.status(400).json({ error })
                            : res.status(200).json({ resultGreenhouse, resultMeasure, resultActiveCrops, resultParameters, resultActiveAlarms });    
                            // enviamos al front los 5 objetos con resultados
                        })    
                    });
                });
            });
        });
    }
    
     // 4. trae la info de todos los invernaderos que tengo o que colaboro
    //localhost:4000/greenhouse/getAllGreenhouses/:user_id
    
    getAllGreenhouses = (req, res) => {

        const user_id = req.params.user_id;
        
        let sqlOwner = `SELECT greenhouse.*, CONCAT(user.first_name, " ", user.last_name) as owner_full_name, count(alarm.alarm_id) as active_alarms 
        FROM greenhouse
        LEFT JOIN alarm ON alarm.greenhouse_id = greenhouse.greenhouse_id 
        LEFT JOIN user ON greenhouse.user_owner_id = user.user_id 
        WHERE user_owner_id = ${user_id} 
        GROUP BY greenhouse_id`;
        
        // consulto en BD los invernaderos que posee el usuario. Estos invernaderos los enviaré al fron en un objeto llamado resultOwner
        connection.query(sqlOwner, (error, resultOwner) => {

            error && res.status(400).json({ error });

            // ahora recojo los greenhouse id de los invernaderos que el usuario posee y los pongo con un buclue en un SQL para usarlos en un filtro

            let ownerFilter = ``;

            if(resultOwner[0]){
                
                for(let i = 0; i < resultOwner.length; i++){
                    ownerFilter += ` AND greenhouse.greenhouse_id != ${resultOwner[i].greenhouse_id}`
                }
                console.log(ownerFilter);
            }

            // este SQL busca los invernaderos donde el usuario SOLO es colaborador. Agrega al final el string que produce el bucle (CONSULTAR ESTE TEMA CON EL EQUIPO A VER SI CAMBIAMOS EL CREATE USER)
            let sqlCollaborator = `SELECT greenhouse.*, CONCAT(user.first_name, " ", user.last_name) as collaborator_full_name, count(alarm.alarm_id) as active_alarms FROM greenhouse LEFT JOIN user_greenhouse ON user_greenhouse.greenhouse_id = greenhouse.greenhouse_id
            LEFT JOIN user ON user_greenhouse.user_id = user.user_id
            LEFT JOIN alarm ON alarm.greenhouse_id = greenhouse.greenhouse_id 
            ${ownerFilter}
            WHERE user.user_id = ${user_id}
            GROUP BY greenhouse_id`;

            connection.query(sqlCollaborator, (error, resultCollaborator) => {

            error 
            ? res.status(400).json({ error })
            : res.status(201).json({resultOwner, resultCollaborator});
                // envío al front dos objetos, uno con los greenhouses que el usuario es dueño y otro con los greenhouse en los que el usuario colabora
            });
        });
    };


    // 5. Borra de manera logica un invernadero
    //localhost:4000/greenhouse/deleteGreenhouse/:greenhouse_id
    deleteGreenhouse = (req, res) => {
    
        const greenhouse_id = req.params.greenhouse_id;
        let sql = `UPDATE greenhouse SET greenhouse_is_deleted = true WHERE greenhouse_id = ${greenhouse_id}`;

        connection.query(sql, (error, result) => {
        error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(`El invernadero ${greenhouse_id} ha sido eliminado`);
        });

    };

    // 6. Invita a un colaborador
    // localhost:4000/greenhouse/inviteGreenhouseCollaborator
    inviteGreenhouseCollaborator = (req, res) => {

        let {name, email} = req.params;
        // ENVIAR UN CORREO A LA PERSONA
        // QUE EN EL CORREO HAYA UN ENLACE O BOTON QUE LLEVE A CREATE USER, PERO QUE LE ENVIE AL CREATE USER EL CORREO Y EL CODIGO DE COLABORADOR (3)... VISTA NUEVA???
    };


    // 7. borrado REAL de un colaborador
    // localhost:4000/greenhouse/deleteGreenhouseCollaborator/:greenhouse_id/:user_id
    deleteGreenhouseCollaborator = (req, res) => {

        let user_id = req.params.user_id;
        let greenhouse_id = req.params.greenhouse_id;
        let sql = `DELETE from user_greenhouse WHERE greenhouse_id = ${greenhouse_id} AND user_id = ${user_id}`;

        connection.query(sql, (error, result) => {
            error
            ? res.status(400).json({error})
            : res.status(200).json(`El colaborador ${user_id} ha sido eliminado del invernadero ${greenhouse_id}`);
        });
    };

    // 8. crear un helper
    // localhost:4000/greenhouse/createHelper/:greenhouse_id
    createHelper = (req, res) => {
        let {first_name, last_name, email, greenhouse_id} = req.body;

        let sql = `INSERT INTO helper (greenhouse_id, helper_first_name, helper_last_name, helper_email) VALUES (${greenhouse_id}, "${first_name}", "${last_name}", "${email}");`

        connection.query(sql, (error, result) => {
            error
            ? res.status(400).json({error})
            : res.status(200).json(`El helper creado en el invernadero ${greenhouse_id}`);
        });

        // ENVIAR UN MAIL DE NOTIFICACION???
    }

    // 9. borrado REAL de un helper
    // localhost:4000/greenhouse/deleteHelper/:helper_id
    deleteHelper = (req, res) => {

        let helper_id = req.params.helper_id;
        let sql = `DELETE FROM helper WHERE helper_id = ${helper_id}`;

        connection.query(sql, (error, result) => {
            error
            ? res.status(400).json({error})
            : res.status(200).json(`El helper ${helper_id} ha sido eliminado`);
        });
    };


    // 10. pedido de medidas actuales
    // localhost:4000/greenhouse/getCurrentMeasures/:greenhouse_id
    getCurrentMeasures = (req, res) => {
        let greenhouse_id = req.params.greenhouse_id;

        let sqlMeasure = `SELECT measure.*, measurement_type.measurement_type_name  from measure, measurement_type WHERE measure.measurement_type_id = measurement_type.measurement_type_id AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_id = ${greenhouse_id} ORDER BY measure_date_time desc LIMIT 1)
            ORDER BY measure_id asc;`;

            connection.query(sqlMeasure, (error, result) => {
                error
                    ? res.status(400).json({ error }) 
                    : res.status(201).json({ result })  
            });
    };

    // 11. pedido de medidas históricas
    // localhost:4000/greenhouse/getAllMeasures/:greenhouse_id
    getAllMeasures = (req, res) => {
        let greenhouse_id = req.params.greenhouse_id;

        let sqlMeasure = `SELECT measure.*, measurement_type.measurement_type_name  from measure, measurement_type WHERE measure.measurement_type_id = measurement_type.measurement_type_id AND measure.greenhouse_id = ${greenhouse_id} ORDER BY measure_id desc;`;

            connection.query(sqlMeasure, (error, result) => {
                error
                    ? res.status(400).json({ error }) 
                    : res.status(201).json({ result })  
            });
    };


    getGreenhouseDetailsByName = (req, res) => {
    
        const greenhouse_name = req.params.greenhouse_name;

        let sqlGreenhouse = `SELECT greenhouse.*, count(user.user_id) as collaborator_count FROM greenhouse LEFT JOIN user_greenhouse ON user_greenhouse.greenhouse_id = greenhouse.greenhouse_id LEFT JOIN user ON user_greenhouse.user_id = user.user_id WHERE greenhouse.greenhouse_name = ${greenhouse_name} GROUP BY greenhouse.greenhouse_name;`;

        // buscamos en BD todos los greenhouses que coincidan con el que se nos pasa por parámetros, y le pedimos que nos diga cuántos colaboradores tiene asociados (left join por si no tiene colaboradores) y guardamos los resultados en el objeto "resultGreenhouse"
        connection.query(sqlGreenhouse, (error, resultGreenhouse) => {
            if (error){
                res.status(400).json({ error }) 
            } 

            let sqlMeasure = `SELECT measure.*, measurement_type.measurement_type_name  from measure, measurement_type WHERE measure.measurement_type_id = measurement_type.measurement_type_id AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_name = ${greenhouse_name} ORDER BY measure_date_time desc LIMIT 1)
            ORDER BY measure_id asc;`;

            // buscamos en BD las últimas medidas que tiene registado el invernadero (con una subconsulta) y las guardamos en el objeto "resultMeasure"
            connection.query(sqlMeasure, (error, resultMeasure) => {
                if (error){
                    res.status(400).json({ error }) 
                } 
    
                let sqlCrop = `SELECT * FROM crop WHERE greenhouse_name = ${greenhouse_name} AND is_active = 1`;

                // buscamos en BD todos los crops activos que tiene el invernadero enviado por params y guardamos los resultados en el objeto "resultActiveCrops"
                connection.query(sqlCrop, (error, resultActiveCrops) => {
                    error && res.status(400).json({ error });

                    let sqlParameters = `SELECT greenhouse_measurement_type.*, measurement_type.measurement_type_name, measurement_type.unit 
                    FROM greenhouse_measurement_type, measurement_type 
                    WHERE greenhouse_measurement_type.measurement_type_id = measurement_type.measurement_type_id 
                           AND greenhouse_name = ${greenhouse_name}`;

                    // buscamos en BD los parámetros que tiene seleccionados el invernadero para cada medida y los guardamos en el objeto "result parameters"
                    connection.query(sqlParameters, (error, resultParameters) => {
                        error && res.status(400).json({ error });
                    
                        let sqlActiveAlarms = `SELECT * FROM alarm WHERE is_active = 1 AND greenhouse_name = ${greenhouse_name}`;

                        // buscamos en BD las alarmas acvtivas que tiene el invernadero y guardamos los resultados en el objeto "resultActiveAlarms"
                        connection.query(sqlActiveAlarms, (error, resultActiveAlarms) => {
                            error 
                            ? res.status(400).json({ error })
                            : res.status(200).json({ resultGreenhouse, resultMeasure, resultActiveCrops, resultParameters, resultActiveAlarms });    
                            // enviamos al front los 5 objetos con resultados
                        })    
                    });
                });
            });
        });
    }
    
}

module.exports = new GreenhouseController();

