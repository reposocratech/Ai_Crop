const nodemailer = require('nodemailer');

"use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main(email_list, measurement_type_name, high_low, alarm_message, greenhouse_name, greenhouse_id, measurement_type_id) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let emails = email_list.toString();

  let text = "";
  high_low === "high" ? text = "por encima" : text = "por debajo";

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //cuenta en este caso de gmail
    port: 465,
    pool: true,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAILSOURCE, // generated ethereal user
      pass: process.env.EMAILPASSWORD, // generated ethereal password
    },
  });
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"AI Crop" <javimorera90@gmail.com>', // sender address
    to: `${emails}`, // list of receivers
    subject: `ALARMA! ${measurement_type_name} ${text} del límite establecido en tu invernadero "${greenhouse_name}"`, // Subject line
    html: 
    `<main>
      <p>${alarm_message}</p>
      <p>Puedes entrar a ver la alarma pulsando aquí</p>
      <br/>
      <a style="text-decoration: none" href="http://localhost:3000/user/greenhouse/${greenhouse_id}/${measurement_type_id}" style="margin: 10px 0; border-radius: 20px; padding: 10px 15px; color: white; background-color: #98B18C; letter-spacing: 0.1em">Ver alarma</a>   
      <br/>
      <br/>
      <br/>
    </main>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = main;