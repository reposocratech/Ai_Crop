const connection = require("../../config/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const nodemailer = require('../../utils/nodemailerCreateUser');
const nodemailerSendNewPass = require('../../utils/nodemailerSendNewPass');
const randomPasswordGenerator = require('../../utils/randomPasswordGenerator')
const nodemailerConfirmEmail = require('../../utils/nodemailerConfirmEmailForPW')
const axios = require('axios');

require("dotenv").config();

class UserController{

  //1.Crear usuario(agricultor)
  //localhost:4000/user/createUser
  createUser = (req, res) => {
    const {first_name, last_name, email, password, address, phone, post_code, city, country, user_knowledge, user_type} = req.body;

    let saltRounds = 8;
    
    bcrypt.genSalt(saltRounds, function(err, saltRounds){

      bcrypt.hash(password, saltRounds, function(err, hash){

        let sql = `INSERT INTO user (first_name, last_name, email, password, address, phone, post_code, city, country, user_knowledge, user_type ) VALUES ('${first_name}', '${last_name}', '${email}', '${hash}', '${address}', '${phone}', '${post_code}', '${city}', '${country}', '${user_knowledge}',${user_type})`;

        connection.query(sql, (error, result) => {
          if(error){
            if(error.code == "ER_DUP_ENTRY"){
                res.status(300).json("dup")
            } else {
                throw error;
            }
          } else {
          
          nodemailer(first_name, email, result?.user_id);

          if(req.body.greenhouse_id){

            let greenhouse_id = req.body.greenhouse_id;

            let sql2 = `SELECT user_id FROM user WHERE email = "${email}" AND is_deleted = 0 AND is_disabled = 0`;
            
            connection.query(sql2, (error2, result2) => {
              error 
                ? res.status(400).json({error2}) 
                : res.status(200).json("TODO OK");

              const info = {
                user_id: result2[0]?.user_id,
                greenhouse_id: greenhouse_id
              }
              
              axios
                .post('http://localhost:4000/user/user_greenhouse', info)
                .then(res => {
                  console.log("El usuario se ASIGNADO éxito")
                })
                .catch(err => {
                  res.status(401).json({err});
                })
            })

            } else {
              res.status(201).json("El usuario se ha creado con éxito");
            }

          }

        })
      })
    })
  }  
  
  // 1.2 Añadir colaborador recientemente creado al greenhouse indicado
  // localhost:4000/user/user_greenhouse
  asignCollab = (req, res) => {
    
    const {user_id, greenhouse_id} = req.body;

    let sql = `INSERT INTO user_greenhouse (user_id, greenhouse_id) VALUES (${user_id}, ${greenhouse_id})`

    connection.query(sql, (error, result) => {
      error 
      ? res.status(400).json("EMAIL DUPLICADO!!")
      : res.status(200).json("TODO OK");
    });
  }

  //2. Editar usuario (agricultor)
  //localhost:4000/user/editUser
  editUser = (req, res) => {
    
    let user_id = req.params.user_id;
    
    const { first_name, last_name, dni, phone, address, post_code, city, country, user_knowledge } = JSON.parse(req.body.register);
    
    let img = "";
    
    let sql = `UPDATE user SET first_name = "${first_name}", last_name = "${last_name}", dni ="${dni}", phone = "${phone}", address = "${address}",post_code = "${post_code}", city = "${city}", country = "${country}", user_knowledge = "${user_knowledge}" WHERE user_id = "${user_id}"`;
    
    if (req.file != undefined) {
      img = req.file.filename;
      sql = `UPDATE user SET first_name = "${first_name}", last_name = "${last_name}", dni ="${dni}", phone = "${phone}", address = "${address}",post_code = "${post_code}", city = "${city}", country = "${country}", user_knowledge = "${user_knowledge}", user_photo = "${img}" WHERE user_id = "${user_id}"`;
     }
  
     connection.query(sql, (error, result) => {
       error 
       ? res.status(400).json({ error }) 
       : res.status(200).json({result, img });
     });
  };

  //3. Borrar usuario (borrado lógico)
  //localhost:4000/user/deleteUser/:user_id
  deleteUser = (req, res) => {
    let user_id = req.params.user_id;

    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = ${user_id}`

    connection.query(sql, (error, result) => {
      error
        ? res.status(400).json({error})
        : res.status(201).json("El usuario ha sido eliminado con éxito");
      })
  }

  //4. Login
  // localhost:4000/user/login
  login = (req, res) => {
    let { email, password } = req.body;

    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    // Buscamos en BD al usuario por correo electronico
    connection.query(sql, (error, result) => {
      error && res.status(400).json(error);

      // si la consulta viene vacía (el correo ingresado no existe)
      if (!result || !result.length || result[0].is_deleted == 1) {
        res.status(300).json("Usuario no registrado");
      } else { // si la consulta trae un registro (el correo ingresado existe)

        const [user] = result;
        const hash = user.password;
        const user_id = user.user_id;

        // compara la PW ingresada con la ecnriptada (hash)
        bcrypt.compare(password, hash, (error, response) => {
          error && res.status(400).json(error); 

          if (response === true) { // si la contraseña coincide
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  name: user.name,
                  user_id: user_id,
                  user_type: user.type,//1- admin, 2- agricultor y 3- colaborador 
                  img: user.user_photo
                },
              },
              process.env.SECRET,
              { expiresIn: "7d" }
            );
            res.status(200).json( {token, user: result[0]});

          } else { // si la contraseña no coincide
            res.status(401).json("Usuario y contraseña incorrectos");
          }
        });
      }
    });
  };

  //5. Change password
  // localhost:4000/user/changePassword
  changePasswordFromSettings = (req, res) => { // este método recupera la contraseña desde el correo

    const {email, currentPass, newPass} = req.body;

    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    // Buscamos en BD al usuario por correo electronico
    connection.query(sql, (error, result) => {
      error && res.status(400).json(error);

      const [user] = result;
      const hash = user.password;
      const user_id = user.user_id;

      // compara la PW ingresada con la ecnriptada (hash)
      bcrypt.compare(currentPass, hash, (error, response) => {
        error && res.status(400).json(error); 

          if (response === true) { // si la contraseña coincide
            
            let saltRounds = 8;
            
            bcrypt.genSalt(saltRounds, function(err, saltRounds){
        
              bcrypt.hash(newPass, saltRounds, function(err, hash){
                let sql = `UPDATE user SET password = '${hash}' WHERE email = '${email}'`;
        
                  connection.query(sql, (error3, result3) => {
                  error3
                    ? res.status(400).json({error3})
                    : res.status(201).json("Contraseña cambiada con éxito");
                  })
              })
            })

          } else { // si la contraseña no coincide
            res.status(401).json("Contraseña incorrecta");
          }
        });
      })
  }

  //6. Retreive Password (envía un correo electrónico al correo introducido para confirmar el correo)
  // localhost:4000/user/retreivePassword
  passwordSendConfirmationEmail = (req, res) => {
    const email = req.body.email;
    let sql = `SELECT email FROM user WHERE email = "${email}" AND is_deleted = 0 and is_disabled = 0`

    
    connection.query(sql, (error, result) => {
      error && res.status(400).json(error);

      if (!result[0]){
        res.status(300).json("No existe");
      } else {
        nodemailerConfirmEmail(email);
        res.status(200).json("Existe");
      }
    })

  }
  

  //6.1 Change Password from email (un endpoint al que se accede por un botón en un correo electrónico y que genera y envía una clave al azar)
  // localhost:4000/user/generateRandomPassword/:email
  changePasswordFromEmail = (req, res, ne) => {
    const email = req.params.email;
    const password = randomPasswordGenerator();

    let saltRounds = 8;
  
    bcrypt.genSalt(saltRounds, function(err, saltRounds){

      bcrypt.hash(password, saltRounds, function(err, hash){
        let sql = `UPDATE user SET password = '${hash}' WHERE email = '${email}'`;

        connection.query(sql, (error, result) => {
          error && res.status(400).json({error});

          let sql2 = `SELECT first_name FROM user WHERE email = '${email}'`
         
          connection.query(sql2, (error, result2) => {
            error && res.status(400).json({error});
            let name = result2[0].first_name;

            nodemailerSendNewPass(email, name, password);
            res.redirect(`http://localhost:3000/login`);
          });
        });
      });
    });
  };
  
// 7. Get one user
// localhost:4000/user/getOneUser/:user_id
  getOneUser = (req, res) => {
    const user_id = req.params.user_id;

    let sqlUser = `SELECT * FROM user WHERE user_id = ${user_id} and is_deleted = 0`;

    connection.query(sqlUser, (error, resultUser) => {
      error
      ? res.status(400).json({ error })
      : res.status(200).json({ resultUser });
      });
  } 
}


  module.exports = new UserController();
  
  
  
  
  
  
  
  