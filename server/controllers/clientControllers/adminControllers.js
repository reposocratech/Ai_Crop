const connection = require('../../config/db');

class AdminController {


    //1. disabled user (agricultor)
    // localhost:4000/admin/disableUser/:user_id
    disableUser = (req, res) => {

        let user_id = req.params.user_id;
        
        let sql = `UPDATE user SET is_disabled = 1 WHERE user_id = "${user_id}"`;

        connection.query(sql, (error, result) => {
            error
            ? res.status(400).json({error})
            : res.status(200).json(`user ${user_id} was disabled`);
        });
    }

    //2. Enabled user (Agricultor)
    // localhost:4000/admin/enableUser/:userI
    enableUser = (req, res) => {

        let user_id = req.params.user_id;

        let sql = `UPDATE user SET is_disabled = 0 WHERE user_id = "${user_id}"`;

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.status(200).json(`user ${user_id} was enabled`);
        });
    }

    //3. Select all users and the count of greenshouses associated with them
    // localhost:4000/admin/allUser
    selectAllUsers = (req, res) => {

        let sql = 
            `SELECT user.*, count(greenhouse.greenhouse_id) as gh_count
            from user, greenhouse, crop, user_greenhouse
            where user_greenhouse.user_id = user.user_id
                and user_greenhouse.greenhouse_id = greenhouse.greenhouse_id
                and greenhouse.greenhouse_id = crop.greenhouse_id
            GROUP BY user.user_id
            ORDER BY RAND();`;

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

        let sql = 
            `SELECT * 
            from user, greenhouse, crop, user_greenhouse
            where user_greenhouse.user_id = user.user_id
                and user_greenhouse.greenhouse_id = greenhouse.greenhouse_id
                and greenhouse.greenhouse_id = crop.greenhouse_id
                and user.user_id = ${user_id}
            ORDER BY RAND();`;

            connection.query(sql, (error, result) => {
                error 
                ? res.status(400).json({error})
                : res.status(200).json(result);
            });
    }
}
module.exports = new AdminController();