const connection = require("../../config/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const nodemailer = require('../../utils/nodemailerCreateUser');
const nodemailerSendNewPass = require('../../utils/nodemailerSendNewPass');
const randomPasswordGenerator = require('../../utils/randomPasswordGenerator')
const axios = require('axios');

require("dotenv").config();

class UserController{

//1.Crear usuario(agricultor)
  //localhost:4000/user/createUser
  createUser = (req, res) => {
    const {first_name, last_name, email, password, address, phone, city, country, user_knowledge, user_type} = req.body;
    
    let saltRounds = 8;
    
    bcrypt.genSalt(saltRounds, function(err, saltRounds){

      bcrypt.hash(password, saltRounds, function(err, hash){

        let sql = `INSERT INTO user (first_name, last_name, email, password, address, phone, city, country, user_knowledge, user_type ) VALUES ('${first_name}', '${last_name}', '${email}', '${hash}', '${address}', '${phone}', '${city}', '${country}', '${user_knowledge}',${user_type}) `;
        console.log(sql);

        connection.query(sql, (error, result) => {
          error && res.status(400).json({error});
          
          nodemailer(first_name, email, result?.user_id);
          console.log(req.params.greenhouse_id)

          // if(req.params.greenhouse_id){
          //   let greenhouse_id = req.params.greenhouse_id;
          //   let sql2 = `SELECT user_id FROM user WHERE email = ${email} AND is_deleted = 0 AND is_disabled = 0`;
          
          //   connection.query(sql2, (error, result2) => {
          //     error && res.status(400).json({error});

          //     const info = {
          //       user_id: result2.user_id,
          //       greenhouse_id: greenhouse_id
          //     }
              
          //     axios
          //       .post('http://localhost:4000/user/user_greenhouse', {info})
          //       .then(res.status(201).json(`El usuario ${info.user_id} ha sido añadido como colaborador del invernadero ${info.greenhouse_id}`))
          //       .catch(err.status(401).json(`ERRORRRR`))
          //   })
          // } else {
            res.status(201).json("El usuario se ha creado con éxito");
          // }
            
        })
      })
    })
  }  
  
  // 1.2 Añadir colaborador recientemente creado al greenhouse indicado
  // localhost:4000/user/user_greenhouse
  asignCollab = (req, res) => {
    
    const {user_id, greenhouse_id} = req.body;
    console.log(req.body);

    let sql = `INSERT INTO user_greenhouse (user_id, greenhouse_id) VALUES (${user_id}, ${greenhouse_id})`

  }

  //2. Editar usuario (agricultor)
  //localhost:4000/user/editUser
  editUser = (req, res) => {
    
    let user_id = req.params.user_id;
    
    const { first_name, last_name, dni, phone, address, post_code, city, country, user_knowledge } = JSON.parse(req.body.register);
  
    // const { name, lastname, phone, address, email } = req.body;
    // PROBAR DE ESTA FORMA SI EL JSON PARSE NO FUNCIONA
  
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
        res.status(401).json("Usuario no registrado");
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
  // localhost:4000/user/changePassword/:user_id
  changePasswordFromSettings = (req, res) => { // este método recupera la contraseña desde el correo

    // ESTE METODO recibe un email y una contrasña y actualiza la BD: NO HACE VALIDACION DE PW NI HASH......
    const {email, password} = req.body;

    let saltRounds = 8;
    
    bcrypt.genSalt(saltRounds, function(err, saltRounds){

      bcrypt.hash(password, saltRounds, function(err, hash){
        let sql = `UPDATE user SET password = '${hash}' WHERE email = '${email}'`;

          connection.query(sql, (error, result) => {
          error
            ? res.status(400).json({error})
            : res.status(201).json("Contraseña cambiada con éxito");
          })
      })
    })
  }

  //6. Forgot password (generates new password and sends it by email)
  // localhost:4000/user/changePassword/:user_id
  changePasswordFromEmail = (req, res) => {
    const email = "gd@h"; // ESTO LLEGA POR REQ PARAMS DESDE EL EMAIL
    let sql = `SELECT * FROM user WHERE email = "${email}" AND is_deleted = 0 AND is_disabled = 0`;

    connection.query(sql, (error, resultUser) => {
      error && res.status(400).json({error});
      let email = resultUser.email;
      let password = randomPasswordGenerator();

      let saltRounds = 8;
    
      bcrypt.genSalt(saltRounds, function(err, saltRounds){
  
        bcrypt.hash(password, saltRounds, function(err, hash){
          let sql = `UPDATE user SET password = '${hash}' WHERE email = '${email}'`;
  
            connection.query(sql, (error, result) => {
              error && res.status(400).json({error});
              nodemailerSendNewPass(email, user_first_name, new_password  );
              res.status(201).json(`Contraseña nueva: ${password}`);
            })
        })
      })
   })

    
  // SE ENVIA UN CORREO ELECTRONICO AL USUARIO CON EL CORREO INTRODUCIDO (METODO POST)
  }
  
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

// 8. Acceder al formulario de creador de usuario tipo 3

  module.exports = new UserController();
  
  
  
  
  
  
  
  