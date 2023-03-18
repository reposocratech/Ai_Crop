const connection = require('../../config/db');
const axios = require('axios');

class EmailController {

    //1. Send notification emails
    // localhost:4000/
    getAlarmEmails = (req, res) => {
        let alarm_id = req.params.alarm_id;

        let sqlAlarmCollaborators = `SELECT user.email
        FROM alarm, greenhouse, user_greenhouse, user
        WHERE alarm_id = ${alarm_id}
        AND alarm.greenhouse_id = greenhouse.greenhouse_id
        AND user_greenhouse.greenhouse_id = greenhouse.greenhouse_id
        AND user_greenhouse.user_id = user.user_id`;

        connection.query(sqlAlarmCollaborators, (error, resultAlarmCollaborators) => {
            error && res.status(400).json({ error });
            
            let sqlHelpers = `SELECT helper.helper_email
            FROM alarm, greenhouse, helper
            WHERE alarm_id = ${alarm_id}
            AND alarm.greenhouse_id = greenhouse.greenhouse_id
            AND greenhouse.greenhouse_id = helper.greenhouse_id;`

            connection.query(sqlHelpers, (error, resultHelpers) => {
                error && res.status(400).json({ error });

                let emailList = [];
                
                for(let i = 0; i < resultAlarmCollaborators.length; i++){
                    emailList.push(resultAlarmCollaborators[i])
                }
                for(let i = 0; i < resultHelpers.length; i++){
                    emailList.push(resultHelpers[i])
                }

                axios.post(`http://localhost:4000/server/alarm/createAlarm`, [emailList])
                    .then(response => {
                        console.log("AXIOSSSSSSSSSSSS");
                    })
                    .catch(error => {
                        console.log("ERRORRRRRRRRR");
                    })  
            })    
        })
    }

    sendAlarmEmails = (req, res) => {

    }

}
module.exports = new EmailController();