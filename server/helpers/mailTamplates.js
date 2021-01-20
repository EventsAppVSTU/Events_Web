class EmptyLetter {
    constructor (letter){
        //gimly99@mail.ru,
        // console.log('Letter constructor', letter)
        this.from ='"Events App ✅ " <vityapopov98@gmail.com>' // sender address
        this.to = "vityapopov98@yandex.ru" // list of receivers
        this.subject =  letter.subject // Subject line
        this.text = letter.text // plain text body
        this.html = letter.html // html body
      }
}


class AcceptUserOnEventLetter{
    constructor(name, requestedEvent, code){
        this.name = name
        this.requestedEvent = requestedEvent
        this.code = code
    }
    createLetter(){
        //,vityapopov98@yandex.ru
        return {
            from: '"Events App ✅ " <vityapopov98@gmail.com>', // sender address
            to: "", // list of receivers
            subject: "Заявка на участие в событии", // Subject line
            text: `
            Ура! Ваша заявка принята. Поздравляем, ${this.name}, вы участник события ${this.requestedEvent}. Ваш код для доступа: ${this.code}  
            `, // plain text body
            html: `<h1>Ваша заявка принята.</h1>
            <p><br><b>Поздравляем, ${this.name}, вы участник события ${this.requestedEvent}. </b><br> Ваш код для доступа: ${this.code}</p>`, // html body
        }
    }
}


class DeclineUserRequestLetter{
    constructor(name, requestedEvent){
        this.name = name
        this.requestedEvent = requestedEvent
    }
    createLetter(){
        //,vityapopov98@yandex.ru
        return {
            from: '"Events App ✅ " <vityapopov98@gmail.com>', // sender address
            to: "", // list of receivers
            subject: "Заявка на участие в событии", // Subject line
            text: `
            Ваша заявка была отклонена администратором. К сожалению, ${this.name}, Вы не сможете участвовать в мероприятии "${this.requestedEvent}".
            
            По всем вопросам обращаться по телефону: 8-ххх-000-чч-лл
            `, // plain text body
            html: `<h1>Ваша заявка отклонена.</h1>
            <p>
                <br>
                <b>Ваша заявка была отклонена администратором. К сожалению, ${this.name}, Вы не сможете участвовать в мероприятии "${this.requestedEvent}".</b>
                <br>
                <br>
                По всем вопросам обращаться по телефону: 8-ххх-000-чч-лл
            </p>`, // html body
        }
    }
}


//{
    //     from: '"Events App ✅ " <vityapopov98@gmail.com>', // sender address
    //     to: "vityapopov98@yandex.ru", // list of receivers
    //     subject: "Заявка на участие в событии", // Subject line
    //     text: "Ваша заявка принята", // plain text body
    //     html: `<h1>Ваша заявка принята</h1><b>Поздравляем, ${req.body.name}, вы участник события ${req.body.requestedEvent} </b> <br> <p>Ваш код для доступа: ${code}</p>`, // html body
    // }



//Accept template


//Decline template

export{
    AcceptUserOnEventLetter,
    DeclineUserRequestLetter
}