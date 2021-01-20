import {Letter} from '../helpers/mail.js'
import {AcceptUserOnEventLetter, DeclineUserRequestLetter} from '../helpers/mailTamplates.js'

test('send mail', () => {
    const letterDraft = {
        from: '"Events App ✅ " <vityapopov98@gmail.com>', // sender address
        to: "vityapopov98@yandex.ru", // list of receivers
        subject: "Тема", // Subject line
        text: "Hello world", // plain text body
        html: "<h1>Title</h1>"
    }
    
    const mail = new Letter(letterDraft)

    mail.sendMail().then(res=>{
        expect(res.response).toMatch(/250/)
    })
});

test('Accept letter constructor', () => {
    const letterDraftCheck = {
        from: '"Events App ✅ " <vityapopov98@gmail.com>', 
            to: "", 
            subject: "Заявка на участие в событии",
            text: `
            Ура! Ваша заявка принята. Поздравляем, Виктор, вы участник события Секретные разработки. Ваш код для доступа: 2740  
            `, 
            html: `<h1>Ваша заявка принята.</h1>
            <p><br><b>Поздравляем, Виктор, вы участник события Секретные разработки. </b><br> Ваш код для доступа: 2740</p>`, // html body
    }
    
    const letterDraft = new AcceptUserOnEventLetter('Виктор', 'Секретные разработки', '2740').createLetter()

    expect(letterDraft).toEqual(letterDraftCheck)
});

test('Decline letter constructor', () => {
    const letterDraftCheck = {
        from: '"Events App ✅ " <vityapopov98@gmail.com>', // sender address
            to: "", // list of receivers
            subject: "Заявка на участие в событии", // Subject line
            text: `
            Ваша заявка была отклонена администратором. К сожалению, Виктор, Вы не сможете участвовать в мероприятии "Секретные разработки".
            
            По всем вопросам обращаться по телефону: 8-ххх-000-чч-лл
            `, // plain text body
            html: `<h1>Ваша заявка отклонена.</h1>
            <p>
                <br>
                <b>Ваша заявка была отклонена администратором. К сожалению, Виктор, Вы не сможете участвовать в мероприятии "Секретные разработки".</b>
                <br>
                <br>
                По всем вопросам обращаться по телефону: 8-ххх-000-чч-лл
            </p>`, // html body
    }
    
    const letterDraft = new DeclineUserRequestLetter('Виктор', 'Секретные разработки').createLetter()

    expect(letterDraft).toEqual(letterDraftCheck)
});


// Info: {
//     accepted: [Array],
//     rejected: [],
//     envelopeTime: 567,
//     messageTime: 1195,
//     messageSize: 936,
//     response: '250 2.0.0 OK  1608805104 m8sm2709153lji.57 - gsmtp',
//     envelope: [Object],
//     messageId: '<d322dfbb-edbe-cccc-6481-8aa45fa49ef7@gmail.com>'
//   }