// import pkg from 'nodemailer'
// const {nodemailer} = pkg
import nodemailer from 'nodemailer'
// var nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    service: 'gmail',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: 'vityapopov98@gmail.com', // generated ethereal user
      pass: 'oH4mOg7@30e-new', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Fred Foo 👻" <vityapopov98@gmail.com>', // sender address
    to: "vityapopov98@yandex.ru", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }, (error, info)=>{
      if(error){
          console.log(error)
      }
      else{
          console.log("Message sent: %s", info.messageId);

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }

  })
