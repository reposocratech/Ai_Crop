const nodemailer = require('nodemailer');

"use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main(email, name, user_first_name, user_last_name, greenhouse_id, greenhouse_name) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //cuenta en este caso de gmail
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAILSOURCE, // generated ethereal user
      pass: process.env.EMAILPASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"AI Crop" <javimorera90@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: `¡Te han invitado a colaborar en AI crop!`, // Subject line
    text: `Hola ${name}! ${user_first_name} ${user_last_name} te ha invitado a unirte a su invernadero ${greenhouse_name} en AI crop. Completa tu registro en el siguiente enlace:
    http://localhost3000/user/createuser/collaborator/${greenhouse_id}`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = main;