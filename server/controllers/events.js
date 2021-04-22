import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getEvets(req, res){
    console.log('😅 getting events', req.headers.token)
    getRequest(`http://yaem.store/robo/events/eventsInfo.php?organization_id=${req.query.organizationId}`, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })

    // fetch('http://yaem.store/robo/events/eventsInfo.php', {
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': req.headers.token
    //     }
    // }).then(res=>{
    //     return res.json()
    // }).then(data=>{
    //     console.log(data)
    //     res.json(data)
    // })

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
        category_id: req.body.category_id,

        private: req.body.private,
        organization_event: req.body.organization_event,
        organization_id: req.body.organization_id
    }
    
    console.log('this data I will send: ', data);

    postRequest('http://yaem.store/robo/events/events.php', data, req.headers.token).then(response=>{
        console.log(response)
        res.json(response);
    }).catch(err=>{
        res.json(err);
    })

    // res.redirect('/');
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
        category_id: req.body.category_id,

        private: req.body.private,
        organization_event: req.body.organizationEvent,
        organization_id: req.body.organizationId
    }
    
    console.log('this data I will send: ', data);
    putReguest('http://yaem.store/robo/events/events.php', data, req.headers.token).then(response=>{
        res.json(response);
    }).catch(err=>{
        res.json(err);
    })
}

function deleteEvent(req, res){
    console.log('delete events', req.body.id)
    // удалить выступления
    if(req.body.id != undefined){
        //удалить текущие событие у админа
        //Удалить событие
        console.log('will delete')
        deleteRequest(`http://yaem.store/robo/events/events.php?id=${req.body.id}`, req.headers.token).then(response=>{
            console.log(data)
            res.json(response);
        }).catch(err=>{
            res.json(err);
        })
    }
}

export {
    getEvets,
    createNewEvent,
    updateEvent,
    deleteEvent
}