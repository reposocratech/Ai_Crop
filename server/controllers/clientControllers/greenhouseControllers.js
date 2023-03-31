const connection = require('../../config/db');
const nodemailerInviteHelper = require('../../utils/nodemailerInviteHelper');
const nodemailerInviteCollab = require('../../utils/nodemailerInviteCollab');


class GreenhouseController {

    //1.1 Inserta en base de datos un nuevo invernadero
    //localhost:4000/greenhouse/createGreenhouse
    createGreenhouse = (req, res) => {

        // console.log(req.body);
        let {user_owner_id, greenhouse_name, greenhouse_location, greenhouse_orientation, greenhouse_type, greenhouse_size, responsibility_acknowledged} = req.body.greenhouseInfo;
        console.log(responsibility_acknowledged);

        let sql = `INSERT INTO greenhouse (user_owner_id, greenhouse_name, greenhouse_location, greenhouse_orientation, greenhouse_type, greenhouse_size, responsibility_acknowledged) VALUES (${user_owner_id}, "${greenhouse_name}", "${greenhouse_location}", "${greenhouse_orientation}", "${greenhouse_type}", ${greenhouse_size}, ${responsibility_acknowledged})`;

        connection.query(sql, (error, result) => {
            error && res.status(400).json({error});
            // 1.2 Inserta en la base de datos los máximos y los mínimos

            let sql2 = `SELECT greenhouse_id FROM greenhouse WHERE user_owner_id = ${user_owner_id} AND greenhouse_name = "${greenhouse_name}" AND greenhouse_is_deleted = 0 ORDER BY greenhouse_id DESC LIMIT 1`;

            connection.query(sql2, (error, result2) => {
                error && res.status(400).json({error});

                let arrayMeasures = req.body.arrayMeasures;
                let sql3 = `INSERT INTO greenhouse_measurement_type (greenhouse_id,measurement_type_id, max, min) VALUES `

                console.log(result2, "resuuuuult");

                for (let i = 0; i < arrayMeasures.length; i++){
                    if(arrayMeasures[i].measurement_type_id != "" && arrayMeasures[i].max != "" && arrayMeasures[i].min != ""){
                        sql3 += `(${result2[0]?.greenhouse_id}, ${arrayMeasures[i].measurement_type_id}, ${arrayMeasures[i].max}, ${arrayMeasures[i].min}), `
                    }
                }
    
                sql3 = sql3.slice(0, -2);
                console.log(sql3);
    
                connection.query(sql3, (error, result) => {
                    error 
                    ? res.status(400).json({error}) 
                    : res.status(201).json("SE CREÓ BIEN EL INVERNADERO AAA");
                });
            })

        });
            
    };
    

    // 2.Edit Greenhouse
    // localhost:4000/greenhouse/editGreenhouse/:greenhouse_id
    editGreenhouse = (req, res) => {
       
        const greenhouse_id = req.params.greenhouse_id;
        const { greenhouse_name, greenhouse_location, greenhouse_orientation, greenhouse_type, greenhouse_size } = req.body.editGreenhouse;
        
        let sql = `UPDATE greenhouse SET greenhouse_name ='${greenhouse_name}', greenhouse_location ='${greenhouse_location}', greenhouse_orientation = '${greenhouse_orientation}', greenhouse_type = '${greenhouse_type}', greenhouse_size = '${greenhouse_size}' WHERE greenhouse_id = ${greenhouse_id}`;
        
        connection.query(sql, (error, result) => {
            error && res.status(405).json({ error }) ;

            let sql2 = `DELETE FROM greenhouse_measurement_type WHERE greenhouse_id = ${greenhouse_id}`;

            connection.query(sql2, (error, result2) => {
                error && res.status(400).json({error});

                let arrayMeasures = req.body.arrayMeasures;
                let sql3 = `INSERT INTO greenhouse_measurement_type (greenhouse_id,measurement_type_id, max, min) VALUES `

                for (let i = 0; i < arrayMeasures.length; i++){
                    if(arrayMeasures[i].measurement_type_id != "" && arrayMeasures[i].max != "" && arrayMeasures[i].min != ""){
                        sql3 += `(${greenhouse_id}, ${arrayMeasures[i].measurement_type_id}, ${arrayMeasures[i].max}, ${arrayMeasures[i].min}), `
                    }
                }
                
                sql3 = sql3.slice(0, -2);
                console.log(sql3);
    
                connection.query(sql3, (error, result) => {
                    error 
                    ? res.status(400).json({error}) 
                    : res.status(201).json("SE CREÓ BIEN EL INVERNADERO AAA");
                });
            });
        });

    };


    //3. see greenhouse info by GH id
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
    
                let sqlCrop = `SELECT * FROM crop WHERE greenhouse_id = ${greenhouse_id}  AND is_deleted = 0`;

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
                            error && res.status(400).json({ error });

                            let sqlCollaborators = `SELECT CONCAT(user.first_name, " ", user.last_name) as collaborator_full_name, user.email FROM user, user_greenhouse, greenhouse WHERE user.user_id = user_greenhouse.user_id AND user_greenhouse.greenhouse_id = greenhouse.greenhouse_id AND greenhouse.greenhouse_id = ${greenhouse_id} AND user.is_deleted = 0 AND user.is_disabled = 0`;

                            // 
                            connection.query(sqlCollaborators, (error, resultCollaborators) => {
                                error && res.status(400).json({ error });

                                let sqlHelpers = `SELECT CONCAT(helper_first_name, " ", helper_last_name) as helper_full_name, helper_email FROM helper WHERE greenhouse_id = ${greenhouse_id} AND is_deleted = 0`;

                                // 
                                connection.query(sqlHelpers, (error, resultHelpers) => {
                                    error 
                                    ? res.status(400).json({ error }):
                                res.status(200).json({ resultGreenhouse, resultMeasure, resultActiveCrops, resultParameters, resultActiveAlarms, resultCollaborators, resultHelpers });    
                            // enviamos al front los 5 objetos con resultados
                        });
                    });
                })    
                    });
                });
            });
        });
    }

    //3.1 see greenhouse info bu GH name
    // localhost:4000/greenhouse/detailsName/:greenhouse_name
    getGreenhouseDetailsName = (req, res) => {
        
        const greenhouse_name = req.params.greenhouse_name;

        let sqlGreenhouse = `SELECT greenhouse.*
        FROM greenhouse 
        WHERE greenhouse.greenhouse_name = "${greenhouse_name}"`;

        // buscamos en BD todos los greenhouses que coincidan con el que se nos pasa por parámetros, y le pedimos que nos diga cuántos colaboradores tiene asociados (left join por si no tiene colaboradores) y guardamos los resultados en el objeto "resultGreenhouse"
        connection.query(sqlGreenhouse, (error, resultGreenhouse) => {
            if (error){
                res.status(400).json({ error }) 
            }
            console.log(resultGreenhouse); 
            let greenhouse_id = resultGreenhouse[0].greenhouse_id;


            let sqlMeasure = `SELECT measure.*, measurement_type.measurement_type_name  from measure, measurement_type WHERE measure.measurement_type_id = measurement_type.measurement_type_id AND measure.measure_date_time = (SELECT measure_date_time from measure WHERE greenhouse_id = ${greenhouse_id} ORDER BY measure_date_time desc LIMIT 1)
            ORDER BY measure_id asc;`;

            // buscamos en BD las últimas medidas que tiene registado el invernadero (con una subconsulta) y las guardamos en el objeto "resultMeasure"
            connection.query(sqlMeasure, (error, resultMeasure) => {
                if (error){
                    res.status(400).json({ error }) 
                } 
    
                let sqlCrop = `SELECT * FROM crop WHERE greenhouse_id = ${greenhouse_id}  AND is_deleted = 0`;

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
                            error && res.status(400).json({ error });

                            let sqlCollaborators = `SELECT CONCAT(user.first_name, " ", user.last_name) as collaborator_full_name, user.email FROM user, user_greenhouse, greenhouse WHERE user.user_id = user_greenhouse.user_id AND user_greenhouse.greenhouse_id = greenhouse.greenhouse_id AND greenhouse.greenhouse_id = ${greenhouse_id} AND user.is_deleted = 0 AND user.is_disabled = 0`;

                            // 
                            connection.query(sqlCollaborators, (error, resultCollaborators) => {
                                error && res.status(400).json({ error });

                                let sqlHelpers = `SELECT CONCAT(helper_first_name, " ", helper_last_name) as helper_full_name, helper_email FROM helper WHERE greenhouse_id = ${greenhouse_id} AND is_deleted = 0`;

                                // 
                                connection.query(sqlHelpers, (error, resultHelpers) => {
                                    error 
                                    ? res.status(400).json({ error }):
                                res.status(200).json({ resultGreenhouse, resultMeasure, resultActiveCrops, resultParameters, resultActiveAlarms, resultCollaborators, resultHelpers });    
                            // enviamos al front los 5 objetos con resultados
                        });
                    });
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
        AND greenhouse.greenhouse_is_deleted = 0
        AND alarm.is_active = 1
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
                // console.log(ownerFilter);
            }

            // este SQL busca los invernaderos donde el usuario SOLO es colaborador. Agrega al final el string que produce el bucle (CONSULTAR ESTE TEMA CON EL EQUIPO A VER SI CAMBIAMOS EL CREATE USER)
            let sqlCollaborator = `SELECT greenhouse.*, CONCAT(user.first_name, " ", user.last_name) as collaborator_full_name, count(alarm.alarm_id) as active_alarms FROM greenhouse LEFT JOIN user_greenhouse ON user_greenhouse.greenhouse_id = greenhouse.greenhouse_id
            LEFT JOIN user ON user_greenhouse.user_id = user.user_id
            LEFT JOIN alarm ON alarm.greenhouse_id = greenhouse.greenhouse_id 
            WHERE user.user_id = ${user_id}
            ${ownerFilter}
            AND alarm.is_active = 1
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
    // localhost:4000/greenhouse/inviteCollaborator
    inviteGreenhouseCollaborator = (req, res) => {

        let {name, email, first_name, last_name, greenhouse_id} = req.body;
        
        let sql = `SELECT * FROM user WHERE email = '${email}' AND is_deleted = 0 AND is_disabled = 0`;
        console.log(email);

        connection.query(sql, (error, result) => {
            error && res.status(400).json({error});

            if(result[0]){
                
                // SI EL USUARIO YA EXISTE, LO ASIGNAMOS AL GREENHOUSE
                // ESTO FUNCIONA BIEN
                let sqlAddCollaborator = `INSERT INTO user_greenhouse (user_id, greenhouse_id) VALUES (${result[0].user_id}, ${greenhouse_id})`;

                connection.query(sqlAddCollaborator, (error, resultCollab) => {
                    error && res.status(400).json({ error }) ;
                    
                    nodemailerInviteCollab(email, name, first_name, last_name, greenhouse_id);
                        console.log(email);
                    res.status(200).json(`El usuario ${result[0].user_id} ha sido añadido como colaborador del invernadero ${greenhouse_id}`);
                });

            } else {
                nodemailerInviteCollab(email, name, first_name, last_name, greenhouse_id);
                res.status(200).json(`${name} ha sido invitado a unirse como colaborador en tu invernadero ${greenhouse_id}`) // AQUÍ VA EL LINK PARA ACCEDER AL FORMULARIO (SECRETO) DE REGISTRO DE COLABORADOR
            }
            });
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
    // localhost:4000/greenhouse/createHelperrs
    createHelper = (req, res) => {
         
        let {helper_first_name, helper_last_name, helper_email, user_id, first_name, last_name, greenhouse_id, greenhouse_name} = req.body;

        let sql = `SELECT * FROM helper WHERE helper_email = '${helper_email}' AND greenhouse_id = ${greenhouse_id}`;

        connection.query(sql, (error, result) => {

            if(!result[0]){

                let sqlAddHelper = `INSERT INTO helper (greenhouse_id, helper_first_name, helper_last_name, helper_email) VALUES (${greenhouse_id}, "${helper_first_name}", "${helper_last_name}", "${helper_email}")`;

                console.log(sqlAddHelper,"addhelper-------------");

                connection.query(sqlAddHelper, (error, resultHelper) => {
                    if(error){
                        res.status(400).json({ error }) 
                    } else {
                        nodemailerInviteHelper(helper_email, helper_first_name, helper_last_name, first_name, last_name, greenhouse_id, greenhouse_name);

                        res.status(200).json(`${helper_first_name} ${helper_last_name} ha sido añadido como ayudante del invernadero ${greenhouse_name}`);
                    } 
                });

            } else {
                if (result[0].is_deleted === 1){
                    let sqlRetreiveHelper = `UPDATE helper SET is_deleted = 0`;

                    connection.query(sqlRetreiveHelper, (error, resultRetreiveHelper) => {
                        if(error){
                            res.status(400).json({ error }) 
                        } else {
                            nodemailerInviteHelper(helper_email, helper_first_name, helper_last_name, first_name, last_name, greenhouse_id, greenhouse_name);
                            
                            res.status(200).json(`${helper_first_name} ${helper_last_name} ha sido añadido como ayudante del invernadero ${greenhouse_name}`);
                        } 
                    });

                } else {
                    if (result[0] && result[0].is_deleted === 0){
                        res.status(200).json(`El ayudante ${helper_first_name} ${helper_last_name} ya se encuentra asociado al invernadero ${greenhouse_name}`);
                    };
                };
            };
        });
    };

    // 9. borrado lógico de un helper
    // localhost:4000/greenhouse/deleteHelper/:helper_id
    deleteHelper = (req, res) => {

        let helper_id = req.params.helper_id;
        let sql = `UPDATE helper SET is_deleted = 1 WHERE helper_id = ${helper_id}`;

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

