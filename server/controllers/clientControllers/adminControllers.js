const connection = require('../../config/db');

class AdminController {


    //1. disable user (agricultor)
    // localhost:4000/admin/disableUser/:user_id
    disableUser = (req, res) => {

        let user_id = req.params.user_id;
        
        let sql = `UPDATE user SET is_disabled = 1 WHERE user_id = ${user_id}`;

        connection.query(sql, (error, result) => {
            error
            ? res.status(400).json({error})
            : res.status(200).json(`user ${user_id} was disabled`);
        });
    }

    //2. Enable user (Agricultor)
    // localhost:4000/admin/enableUser/:user_id
    enableUser = (req, res) => {

        let user_id = req.params.user_id;

        let sql = `UPDATE user SET is_disabled = 0 WHERE user_id = ${user_id}`;

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.status(200).json(`user ${user_id} was enabled`);
        });
    }

    //3. Select all users and the count of greenshouses associated with them
    // localhost:4000/admin/allUser
    selectAllUsers = (req, res) => {

        let sql = `SELECT user.user_id, CONCAT(user.first_name," ", user.last_name) as full_name, user.email, user.user_type, user.is_disabled, count(greenhouse.greenhouse_id) as n_of_greenhouses
        FROM user
        LEFT JOIN user_greenhouse ON user_greenhouse.user_id = user.user_id
        LEFT JOIN greenhouse ON user_greenhouse.greenhouse_id = greenhouse.greenhouse_id
        WHERE user.is_deleted = 0
        AND greenhouse_is_deleted = 0
        GROUP BY user.user_id
        ORDER BY user.first_name;`;

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.status(200).json(result);
        });
    }


  //4.Trae la información detallada (ghs y crops) de un usuario
  //localhost:4000/admin/oneUser/:user_id  
  selectOneUser = (req, res) => {
    const user_id = req.params.user_id;

        let sqlUser = `SELECT * FROM user WHERE user_id = ${user_id};`;
        //traemos la informacion del usuario por user_id y la guardamos en el objeto "resultUser"
            connection.query(sqlUser, (error, resultUser) => {
                error && res.status(400).json({error});

                let sqlGreenhouseOwner = `SELECT * FROM greenhouse WHERE user_owner_id = ${user_id} AND greenhouse_is_deleted = 0`;
                
                // traemos los greenhouse que el usuario posee y los guardamos en el objeto "resultGreenhouseOwner"
                connection.query(sqlGreenhouseOwner, (error, resultGreenhouseOwner) => {
                    error && res.status(400).json({error});

                    // creamos el array "greenhouses" donde iremos poniendo los greenhouse id asociados al usuario
                    let greenhouses = [];
                    
                    // agregamos estos greenhouses al array de sus greenhouses
                    for(let i = 0; i < resultGreenhouseOwner.length;i++){
                        greenhouses.push(resultGreenhouseOwner[i].greenhouse_id)
                    }

                    let sqlGreenhouseCollaborator = `SELECT greenhouse.* FROM user, user_greenhouse, greenhouse WHERE user_greenhouse.user_id = ${user_id} AND greenhouse.greenhouse_is_deleted = 0 AND user_greenhouse.user_id = user.user_id AND user_greenhouse.greenhouse_id = greenhouse.greenhouse_id`;
        
                    // traemos los greenhouse donde el usuario es colaborador y los guardamos en el objeto "resultGreenhouseCollaborator"
                    connection.query(sqlGreenhouseCollaborator, (error, resultGreenhouseCollaborator) => {
                        error && res.status(400).json({error});

                        // agregamos estos greenhouses al array de sus greenhouses
                        for(let i = 0; i < resultGreenhouseCollaborator.length;i++){
                            greenhouses.push(resultGreenhouseCollaborator[i].greenhouse_id)
                        }

                        // si el usuario tiene greenhouses asociados (tanto owner como colaborador), que nos traiga los crops de esos greenhouses (el sql se escribe con un bucle para incluir todos los greenhouses)
                        if(greenhouses[0]){
                            let sqlCrops = `SELECT * FROM crop WHERE is_deleted = 0 AND `;
                            for(let i = 0; i < greenhouses.length; i++){
                                sqlCrops += `greenhouse_id = ${greenhouses[i]} OR `
                            }
                            sqlCrops = sqlCrops.slice(0, -3);
                            console.log(sqlCrops);

                            // consultamos la BD por los crops de estos greenhouses y los guardamos en el objeto "resultCrops" y envia al front los 4 objetos con resultados
                            connection.query(sqlCrops, (error, resultCrops) => {
                                error 
                                ? res.status(400).json({error})
                                : res.status(200).json({resultUser, resultGreenhouseOwner, resultGreenhouseCollaborator, resultCrops});
                            });
                        } else {
                            // en caso de no haber crops, enviamos todo menos el resultado de crops
                            res.status(200).json({resultUser, resultGreenhouseOwner, resultGreenhouseCollaborator});
                        }
                    });
                });
            });
    }
}
module.exports = new AdminController();