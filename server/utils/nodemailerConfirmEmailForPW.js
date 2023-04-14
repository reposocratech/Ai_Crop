const nodemailer = require('nodemailer');

"use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //cuenta en este caso de gmail
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAILSOURCE, // generated ethereal user
      pass: process.env.EMAILPASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"AI Crop" <javimorera90@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: `¡Has solicitado una nueva contraseña!`, // Subject line
    
    // plain text body
    html: `<main style="padding: 20px">
    <p>Has solicitado un cambio de contraseña. Pulsa en el siguiente botón y recibirás otro correo con tu nueva contraseña.</p>
    <br/>
    <a style="text-decoration: none" href="http://localhost:4000/user/generateRandomPassword/${email}" style="margin: 10px 0; border-radius: 20px; padding: 10px 15px; color: white; background-color: #98B18C; letter-spacing: 0.1em">Confirmar</a>   
    <br/>
    <br/>
    <p>Podrás cambiarla desde la configuración de tu usuario.</p>
    </main>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = main;