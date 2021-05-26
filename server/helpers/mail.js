
import nodemailer from 'nodemailer'

// team.eventsapp@gmail.com
// 
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'team.eventsapp@gmail.com', // generated ethereal user
    pass: '', // generated ethereal password
  },
});


class Letter {
  constructor (letter){
    //gimly99@mail.ru,
    // console.log('Letter constructor', letter)
    this.from ='"Events App ✅ " <team.eventsapp@gmail.com>' // sender address
    this.to = `${letter.to}, vityapopov98@yandex.ru, team.eventsapp@gmail.com`//"vityapopov98@yandex.ru" // list of receivers
    this.subject =  letter.subject // Subject line
    this.text = letter.text // plain text body
    this.html = letter.html // html body
  }

  //По хорошему сюда сделать метод s
  sendMail(){
    return new Promise((resolve,reject)=>{
      transporter.sendMail(this, (error, info)=>{
        if(error) reject(error);
        else resolve(info);
      })
    })
  }
}

  

  // function makeMail(headers, data){

  //   const mail = {
  //       from: '"Events App ✅ " <vityapopov98@gmail.com>', // sender address
  //       to: "vityapopov98@yandex.ru", // list of receivers
  //       subject: headers.subject, // Subject line
  //       text: data.text, // plain text body
  //       html: data.html, // html body
  //   }

  //   return mail
  // }

// const mail = {
//     from: '"Events App ✅ " <vityapopov98@gmail.com>', // sender address
//     to: "vityapopov98@yandex.ru", // list of receivers
//     subject: "Заявка на участие в событии", // Subject line
//     text: "Ваша заявка принята", // plain text body
//     html: `<h1>Ваша заявка принята</h1><b>Поздравляем, ${req.body.name}, вы участник события ${req.body.requestedEvent} </b> <br> <p>Ваш код для доступа: ${code}</p>`, // html body
// }

  export {
    // sendMail,
    // makeMail,
    Letter
  }