import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getChosenEvents(req, res){
    console.log('😅 getting organizations')

    getRequest('http://yaem.store/robo/events/choosenEvents.php', req.headers.token).then(data=>{
        console.log('RESPONSE: ', data);    
        res.json(data);
    }).catch(err=>{
        res.json(err);
    })

    // fetch('http://yaem.store/robo/events/choosenEvents.php', {
    //     method: 'GET',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': '1 111111_2'
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

export {
    getChosenEvents
}