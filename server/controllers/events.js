import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getEvets(req, res){
    console.log('😅 getting events')
    getRequest('http://yaem.store/robo/events/eventsInfo.php').then(data=>{
        console.log(data)
        res.json(data)
    })
}

function createNewEvent(req, res){
    console.log('🤨🤨😭 what is goin on?')
    var data = {
        name: req.body.name,
        description: req.body.description,
        startDate: '2020-05-01 00:00:00',
        endDate: '2020-05-02 00:00:00',
        image: req.body.image,
        place: req.body.place,
        category_id: req.body.category_id
    }
    
    console.log('this data I will send: ', data);

    postRequest('http://yaem.store/robo/events/events.php', data).then(response=>{
        console.log(data)
        res.json(response);
    })

    res.redirect('/');
}

function updateEvent(req, res){
    var data = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        image: req.body.image,
        place: req.body.place,
        category_id: req.body.category_id
    }
    
    console.log('this data I will send: ', data);
    putReguest('http://yaem.store/robo/events/events.php', data).then(response=>{
        res.json(response);
    })
}

function deleteEvent(req, res){
    console.log('delete events', req.body.id)
    // удалить выступления
    if(req.body.id != undefined){
        //удалить текущие событие у админа
        //Удалить событие
        console.log('will delete')
        deleteRequest(`http://yaem.store/robo/events/events.php?id=${req.body.id}`).then(response=>{
            console.log(data)
            res.json(response);
        })
    }
}

export {
    getEvets,
    createNewEvent,
    updateEvent,
    deleteEvent
}