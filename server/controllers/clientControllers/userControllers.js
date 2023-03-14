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

      // let saltRounds = 8;
      
      // bcrypt.genSalt(saltRounds, function(err, saltRounds){

      //     bcrypt.hash(password, saltRounds, function(err, hash){
      //       let sql = `INSERT INTO user (first_name, last_name, email, password,
      //         dni, address, phone, city, country, user_photo, user_type,
      //         user_since ) VALUES ('a', "", 'a@a', '1234',
      //          "", "", "", "", "", "", '1', '2000-10-10')`;

      //          connection.query(sql, (error, result) => {

      //           console.log("aaaaaaaaaaaaa", result)
      //           console.log(error);
      //           error
      //             ? res.status(400).json({error})
      //             : res.status(201).json(result);
      //          })
      //     })
      // })
      console.log("casdfasd")
    }
  }

  module.exports = new UserController();
  
  
  
  
  
  
  
  