const connection = require('../../config/db');

class AdminController {


    //1. disable user (agricultor)
    // localhost:4000/admin/disableUser/:user_id
    disableUser = (req, res) => {

        let user_id = req.params.user_id;
        
        let sql = `UPDATE user SET is_disabled = 1 WHERE user_id = ${user_id}`;
        console.log(sql)
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
        console.log(sql)
        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.status(200).json(`user ${user_id} was enabled`);
        });
    }

    //3. Ver todos los usuarios y la cantidad de invernaderos que tienen
    // localhost:4000/admin/allUsers
    selectAllUsers = (req, res) => {

        let sql = `SELECT user.user_id, CONCAT(user.first_name," ", user.last_name) as full_name, user.email, user.user_type, user.is_disabled, COALESCE(sum(active_greenhouses.num),0) as n_of_greenhouses
        FROM user
        LEFT JOIN active_greenhouses ON user.user_id = active_greenhouses.user_owner_id
        WHERE user.is_deleted = 0
        AND user.user_type != 1
        GROUP BY user.user_id
        ORDER BY user.first_name`;

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.status(200).json(result);
        });
    }


    //4. Ver un usuario y la cantidad de invernaderos que tiene
    // localhost:4000/admin/oneUser/:search
    selectOneUser = (req, res) => {

        let search = req.params.search

        let sql = `SELECT user.user_id, CONCAT(user.first_name," ", user.last_name) as full_name, user.email, user.user_type, user.is_disabled, COALESCE(sum(active_greenhouses.num),0) as n_of_greenhouses
        FROM user
        LEFT JOIN active_greenhouses ON user.user_id = active_greenhouses.user_owner_id
        WHERE (user.email LIKE "%${search}%"
        OR user.first_name LIKE "%${search}%"
        OR user.last_name LIKE "%${search}%")
        AND user.is_deleted = 0
        AND user.user_type != 1
        GROUP BY user.user_id
        ORDER BY user.first_name`;

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({error})
            : res.status(200).json(result);
        });
    }
}
module.exports = new AdminController();