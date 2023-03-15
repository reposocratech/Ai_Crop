const connection = require("../../config/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController{

    //1.Crear usuario(agricultor)
    //localhost:4000/user/createUser
    createUser = (req, res) => {
      // const {first_name, last_name, email, password, dni, address, phone, city,
      // country, user_photo, user_type, user_since} = req.body;

      let saltRounds = 8;
      let password = "javi123";
      
      bcrypt.genSalt(saltRounds, function(err, saltRounds){

          bcrypt.hash(password, saltRounds, function(err, hash){
            let sql = `INSERT INTO user (first_name, last_name, email, password,
              dni, address, phone, city, country, user_photo, user_type,
              user_since ) VALUES ('Javier', "Morera", 'javito@gmail.com', '${hash}', "55215250R", "address55555", "657489657", "Madrid", "España", "", '1', '2020-10-10')`;

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
  }

  module.exports = new UserController();
  
  
  
  
  
  
  
  