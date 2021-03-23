// import {sendMail} from '../helpers/mail.js'
import {genRandomCode} from '../helpers/genRandomCode.js'
import {Letter} from '../helpers/mail.js'
import {AcceptUserOnEventLetter, DeclineUserRequestLetter} from '../helpers/mailTamplates.js'

function acceptUserOnEvent(req, res){
  //сгенерировать случайный код
  var code = genRandomCode()
  while(code.length != 4){
    code = genRandomCode()
  }

  //поместить на сервер - нужно еще сделать
  console.log('user: ', req.body)

  //Заполняем шаблон


  //Создаем письмо
  //req.body.requestedEvent
  const letterDraft = new AcceptUserOnEventLetter(req.body.name, req.body.requestedEvent, code).createLetter()
  console.log('Template: ', letterDraft)
  const mail = new Letter(letterDraft)
  mail.sendMail().then(result=>{
    res.json({status: result})
  })

  // //отправить его на почту пользователю
  // sendMail(mail).then(result=>{
  //   res.json({status: result})
  // })

}

function declineUserRequest(req, res){
  const letterDraft = new DeclineUserRequestLetter(req.body.name, req.body.requestedEvent).createLetter()
  const mail = new Letter(letterDraft)
  mail.sendMail().then(result=>{
    res.json({status: result})
  })
}


export{
  acceptUserOnEvent,
  declineUserRequest
}