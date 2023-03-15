const connection = require("../../config/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController{

  //1.Crear usuario(agricultor)
  //localhost:4000/user/createUser
  createUser = (req, res) => {
    // TO DO:
    // DESCOMENTAR destrucuring de req.body
    // BORRAR la variable password
    // AGREGAR variables dinamicas al SQL
    // BORRAR consoleLogs

    // const {first_name, last_name, email, password, dni, address, phone, city, country, user_photo, user_type, user_since} = req.body;

    let saltRounds = 8;
    let password = "javi123";
    
    bcrypt.genSalt(saltRounds, function(err, saltRounds){

      bcrypt.hash(password, saltRounds, function(err, hash){
        let sql = `INSERT INTO user (first_name, last_name, email, password, dni, address, phone, city, country, user_photo, user_type, user_since ) VALUES ('Javier', "Morera", 'javito@gmail.com', '${hash}', "55215250R", "address55555", "657489657", "Madrid", "España", "", '1', '2020-10-10')`;

        connection.query(sql, (error, result) => {

        console.log("aaaaaaaaaaaaa", result)
        console.log(error);

        error
          ? res.status(400).json({error})
          : res.status(201).json(result);
        })
      })
    })
  }

  //2.- Login
  //localhost:4000/user/login
  login = (req, res) => { 
    // TO DO: 
    // DESCOMENTAR destructuring
    // USAR SQL comentada y borrar la otra
    // USAR variable password en bcrypt compare en vez del string

    // let { email, password } = req.body;

    // let sql = `SELECT * FROM user WHERE email = '${email}'`;

    let sql = `SELECT * FROM user WHERE email = 'naza@gmail.com'`;
    connection.query(sql, (error, result) => {
      //consult error
      if (error) return res.status(400).json(error);
      //not found user with this email:
      if (!result || !result.length ||result[0].is_deleted == 1) {
        res.status(401).json("Usuario no registrado");
      } else {
        //email is correct:
        const {user} = result;
        const hash = user.password;
        const user_id = user.user_id;
        //to check password
        bcrypt.compare("javi123", hash, (error, response) => {
             if (error) return res.status(400).json(error)
        //if password matches:
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  first_name: user.first_name,
                  user_id: user_id,
                  user_type: user.user_type,
                  user_since: user.user_since,
                },
              },
              process.env.SECRET, //inside file .env
              { expiresIn: "7d" } //expires in 7 days
            );
            res.status(200).json( {token, user:result[0]});
        //when the password it not correct:
          } else {
            res.status(401).json("Credenciales incorrectas");
          }
        });
      }
    });
  };

//3.Editar usuario(Agricultor)
//localhost:4000/user/editUser/:userId
editUser = (req, res) => {
  // TO DO: 
  // 
  // BORRAR consoleLogs
  
  let user_id = req.params.user_id;

  console.log(JSON.parse(req.body.register))

  let user_photo = "";
  
  const { first_name, last_name, email, dni, phone, address, post_code, country, city, user_knowledge } = JSON.parse(req.body.register);
  
  // SQL to use if there is NO photo update:
  let sql = `UPDATE user SET first_name = "${first_name}", last_name = "${last_name}", email = "${email}", dni = "${dni}", phone = "${phone}", address = "${address}", post_code = "${post_code}", country = "${country}", city = "${city}", user_knowledge = "${user_knowledge}" WHERE user_id = "${user_id}"`;
  

  if (req.file != undefined) {
    
    user_photo = req.file.filename;

    // SQL to use if there is a photo update:
    sql = `UPDATE user SET first_name = "${first_name}", last_name = "${last_name}", email = "${email}", dni = "${dni}", phone = "${phone}", address = "${address}", post_code = "${post_code}", country = "${country}", city = "${city}", user_knowledge = "${user_knowledge}", user_photo = "${user_photo}"  WHERE user_id = "${user_id}"`;
   }

   connection.query(sql, (error, result) => {
     if (error) console.log(error)
     error 
     ? res.status(400).json({ error }) 
     : res.status(200).json({result, user_photo });
   });
};


  // 4. Eliminar un usuario de manera lógica
  //localhost:4000/user/deleteUser/:userId
  deleteUser = (req, res) => { 
    let user_id = req.params.user_id;

    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${user_id}"`;
    
    connection.query(sql, (error, result) => {
      error 
        ? res.status(400).json({ error }) 
        : res.status(200).json(`user ${user_id} was deleted`);
    });
  };
}

  module.exports = new UserController();
  
 