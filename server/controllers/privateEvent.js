// import {sendMail} from '../helpers/mail.js'
import {genRandomCode} from '../helpers/genRandomCode.js'
import {Letter} from '../helpers/mail.js'
import {AcceptUserOnEventLetter, DeclineUserRequestLetter} from '../helpers/mailTamplates.js'
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getBids(req, res){
  getRequest(`http://yaem.store/robo/events/bidsInfo.php`, req.headers.token).then(data=>{
      console.log(data)
      res.json(data)
  }).catch(err=>{
      res.json(err);
  })
}

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
  const letterDraft = new AcceptUserOnEventLetter(req.body.user_name, req.body.event_name, code, req.body.login).createLetter()
  console.log('Template: ', letterDraft)
  const mail = new Letter(letterDraft)
  mail.sendMail().then(result=>{
    //Отправить на сервер код 
    //Сущность –заявки на приватные события
    // /events/bids.php
    // Пример JSON - {"id":1, "user_id":1, "event_id":1, "state_id":1}

    var bidToUpdate = {
      id: req.body.id, 
      user_id: req.body.user_id,
      event_id: req.body.event_id,
      state_id: 3,
      code: code
    }
    putReguest('http://yaem.store/robo/events/bids.php', bidToUpdate ,req.headers.token).then(data=>{
      console.log('код сохранен: ', data)
    }).catch(err=>{
      console.log(err)
    })
    res.json({status: result})
  })


}

function declineUserRequest(req, res){
  // req.body.user_name, req.body.requestedEvent
  const letterDraft = new DeclineUserRequestLetter(req.body.user_name, req.body.event_name, req.body.login).createLetter()
  const mail = new Letter(letterDraft)
  mail.sendMail().then(result=>{
    // отправляем на сервер 
    // состояние "отклонено" /events/bids.php
    var bidToUpdate = {
      id: req.body.id, 
      user_id: req.body.user_id,
      event_id: req.body.event_id,
      state_id: 2
    }
    putReguest('http://yaem.store/robo/events/bids.php', bidToUpdate ,req.headers.token).then(data=>{
      console.log('код сохранен: ', data)
    }).catch(err=>{
      console.log(err)
    })
    res.json({status: result})
  })
}


export{
  getBids,
  acceptUserOnEvent,
  declineUserRequest
}
