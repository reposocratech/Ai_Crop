const connection = require('../../config/db');
const axios = require('axios');
const nodemailerAlarm = require('../../utils/nodemailerSendAlarm');

class EmailController {

    // 1. Trae una lista de correos asociados a un invernadero
    // localhost:4000/server/notification/getAlarmEmails/:alarm_id
    getAlarmEmails = (req, res) => {
        let alarm_id = req.params.alarm_id;
        let sqlAlarm = `SELECT alarm.*, greenhouse.greenhouse_name, measurement_type.measurement_type_name FROM alarm, measurement_type, greenhouse WHERE alarm_id = ${alarm_id} AND measurement_type.measurement_type_id = alarm.measurement_type_id AND greenhouse.greenhouse_id = alarm.greenhouse_id`;

        // buscamos en BD el correo del usuario que esté registrado como owner en el invernadero asociado a esta alarma y lo guardamos como un objeto llamado "resultAlarmOwner"
        connection.query(sqlAlarm, (error, resultAlarm) => {
            error && res.status(400).json({ error });
            let sqlAlarmOwner = `SELECT user.email FROM alarm, greenhouse, user WHERE alarm_id = ${alarm_id} AND alarm.greenhouse_id = greenhouse.greenhouse_id AND greenhouse.user_owner_id = user.user_id`;
    
            // buscamos en BD el correo del usuario que esté registrado como owner en el invernadero asociado a esta alarma y lo guardamos como un objeto llamado "resultAlarmOwner"
            connection.query(sqlAlarmOwner, (error, resultAlarmOwner) => {
                error && res.status(400).json({ error });
    
                let sqlAlarmCollaborators = `SELECT user.email FROM alarm, greenhouse, user_greenhouse, user WHERE alarm_id = ${alarm_id} AND alarm.greenhouse_id = greenhouse.greenhouse_id AND user_greenhouse.greenhouse_id = greenhouse.greenhouse_id AND user.is_deleted = 0 AND user_greenhouse.user_id = user.user_id`;
    
                // buscamos en BD los correos de los usuarios que están registrados como colaboradores en el invernadero asociado a esta alarma y los guardamos como un objeto llamado "resultAlarmCollaborators"
                connection.query(sqlAlarmCollaborators, (error, resultAlarmCollaborators) => {
                    error && res.status(400).json({ error });
    
                    let sqlHelpers = `SELECT helper.helper_email
                    FROM alarm, greenhouse, helper
                    WHERE alarm_id = ${alarm_id}
                    AND alarm.greenhouse_id = greenhouse.greenhouse_id
                    AND greenhouse.greenhouse_id = helper.greenhouse_id;`
        
                    // buscamos en BD los correos que estén registrados como helper en el invernadero asociado a esta alarma y lo guardamos como un objeto llamado "resultHelpers"
                    connection.query(sqlHelpers, (error, resultHelpers) => {
                        error && res.status(400).json({ error });
    
                        // creamos un array llamado "emailList" donde pondremos con bucles y métodos push todos los correos electrónicos almacenados en los resultados anteriores. Se inicia con el correo del owner (siempre va a ser 1 solo)
                        let emailList = [resultAlarmOwner[0].email];
                    
                        for(let i = 0; i < resultAlarmCollaborators.length; i++){
                            emailList.push(resultAlarmCollaborators[i].email)
                        }

                        for(let i = 0; i < resultHelpers.length; i++){
                            emailList.push(resultHelpers[i].helper_email)
                        }
            
                        // enviamos con un método post la lista de correos electronicos al controlador encargado de crear las notificaciones
                        axios.post(`http://localhost:4000/server/notification/createNotifications/${alarm_id}`, [emailList])
                            .then(response => {
                                console.log("AXIOSSSSSSSSSSSS");
                            })
                            .catch(error => {
                                console.log("ERRORRRRRRRRR");
                            })  
    
                        // enviamos con un método post la lista de correos electronicos al controlador encargado de enviar los correos
                        axios.post(`http://localhost:4000/server/notification/sendEmail/${alarm_id}`, {emailList, resultAlarm})
                            .then(response => {
                                console.log("AXIOSSSSSSSSSSSS");
                            })
                            .catch(error => {
                                console.log("ERRORRRRRRRRR");
                            }) 
                    });
                });
            });
        });

    };

    createNotifications = (req, res) => {
        let email_list = req.body[0];
        let alarm_id = req.params.alarm_id;

        for(let i = 0; i < email_list.length; i++){
            let sql = `INSERT INTO notification (alarm_id, notification_email) VALUES (${alarm_id}, "${email_list[i]}")`

            connection.query(sql, (error, result) => {
                error && res.status(400).json({ error });
            });    
            
        };
    };

    sendNotificationEmails = (req, res) => {
        let email_list = req.body.emailList;
        let resultAlarm = req.body.resultAlarm[0];
        let {alarm_id, measurement_type_name, high_low, alarm_message, alarm_date_time, greenhouse_name} = resultAlarm;

        for(let i = 0; i < email_list.length; i++){
          
            nodemailerAlarm(email_list[i], alarm_id, measurement_type_name, high_low, alarm_message, alarm_date_time, greenhouse_name);
        }

        res.status(200).json("HA LLEGADO AL FINAL");
    }

    // 4. Borrar una notificacion
    // localhost:4000/server/notification/deleteNotification/:notification_id
    deleteNotification = (req, res) => {
        let notification_id = req.params.notification_id;

        let sql = `DELETE FROM notification WHERE notification_id = ${notification_id}`;

        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error })
            : res.status(200).json(`Notificacion ${notification_id} borrada`);
        }); 
    }

    // 5. Ver todas las notificaciones por alarma
    // localhost:4000/server/notification/seeAllNotifications/:alarm_id
    seeAllNotifications = (req, res) => {
        let alarm_id = req.params.alarm_id;

        let sql = `SELECT * FROM notification WHERE alarm_id = ${alarm_id} ORDER BY notification_id DESC`;
        connection.query(sql, (error, result) => {
            error 
            ? res.status(400).json({ error })
            : res.status(200).json({result});
        }); 
    }

}
module.exports = new EmailController();