import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getEventNews(req, res){
    console.log('😅 getting events news ', req.query.event_id)
    getRequest(`http://yaem.online/robo/events/eventNews.php?event_id=${req.query.event_id}`).then(data=>{
        console.log(data)
        res.json(data)
    })
}

function createNews(req, res){
    console.log('🤨🤨😭 what is goin on?')
    var data = {
        event_id: req.body.event_id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    }
    
    console.log('this data I will send: ', data);

    fetch('http://yaem.online/robo/events/eventNews.php', {
        method: 'POST', // метод POST 
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': '1 111111_2',
        }),
        body: JSON.stringify(data),  
    }).then(response=>{
        console.log('RESPONSE', response);
        return response.json();
    }).then(smth=>{
        console.log('smth:   ', smth)
    })
    
    res.redirect('/');
}

function deleteEventNews(req, res){
    if(req.body.id != undefined){
        //удалить текущие событие у админа
    //Удалить событие
        console.log('will delete')
        fetch(`http://yaem.online/robo/events/eventNews.php?id=${req.body.id}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': '1 111111_2'
            }
        }).then(res=>{
            var data = res.json();
            console.log('RESPONSE: ', data);
            return data
        }).then(data=>{
            console.log('this is data: ', data);
            res.json(data);
        })
    }
}

export {
    getEventNews,
    createNews, 
    deleteEventNews
}