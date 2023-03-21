const nodemailer = require('nodemailer');

"use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main(email, alarm_id, measurement_type_name, high_low, alarm_message, alarm_date_time, greenhouse_name) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  let text = "";
  high_low === "high" ? text = "por encima" : text = "por debajo";

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //cuenta en este caso de gmail
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'javimorera90@gmail.com', // generated ethereal user
      pass: 'yscqwtfbmucuqmih', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"AI Crop" <javimorera90@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: `ALARMA! ${measurement_type_name} ${text} del límite establecido en tu invernadero ${greenhouse_name}`, // Subject line
    text: `${alarm_date_time}: ${alarm_message}. Id de alarma: ${alarm_id}`, // plain text body
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