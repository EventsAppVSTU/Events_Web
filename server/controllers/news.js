import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getEventNews(req, res){
    console.log('😅 getting events news ', req.query.event_id)
    getRequest(`http://yaem.store/robo/events/eventNews.php?event_id=${req.query.event_id}`, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })

    // fetch(`http://yaem.store/robo/events/eventNews.php?event_id=${req.query.event_id}`, {
    //     headers: new Headers({
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': req.headers.token, //'1 111111_2'
    //     })
    // }).then(response=>{
    //     console.log('RESPONSE', response);
    //     return response.json();
    // }).then(data=>{
    //     console.log('data:   ', data)
    //     res.json(data)
    // }).catch(err=>{
    //     console.log('err:   ', err)
    //     res.json(err)
    // })
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

    postRequest('http://yaem.store/robo/events/eventNews.php', data, req.headers.token).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
    // fetch('http://yaem.store/robo/events/eventNews.php', {
    //     method: 'POST', // метод POST 
    //     headers: new Headers({
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': req.headers.token, //'1 111111_2'
    //     }),
    //     body: JSON.stringify(data),  
    // }).then(response=>{
    //     console.log('RESPONSE', response);
    //     return response.json();
    // }).then(smth=>{
    //     console.log('smth:   ', smth)
    // })
    
    // res.redirect('/');
}

function deleteEventNews(req, res){
    if(req.query.id != undefined){
        //удалить текущие событие у админа
    //Удалить событие
        console.log('will delete')
        deleteRequest(`http://yaem.store/robo/events/eventNews.php?id=${req.query.id}`, req.headers.token).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(err)
        })
        // fetch(`http://yaem.store/robo/events/eventNews.php?id=${req.body.id}`, {
        //     method: 'DELETE',
        //     headers: { 
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Accept': 'application/json',
        //         'Authorization': req.headers.token
        //     }
        // }).then(res=>{
        //     var data = res.json();
        //     console.log('RESPONSE: ', data);
        //     return data
        // }).then(data=>{
        //     console.log('this is data: ', data);
        //     res.json(data);
        // })
    }
}

export {
    getEventNews,
    createNews, 
    deleteEventNews
}