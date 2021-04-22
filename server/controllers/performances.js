import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getPerformances(req, res){

    getRequest(`http://yaem.store/robo/performances/performances.php?event_id=${req.query.event}`, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
    // fetch(`http://yaem.store/robo/performances/performances.php?event_id=${req.query.event}`, {
    //     method: 'GET',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': req.headers.token
    //     }
    // }).then(res=>{
    //     return res.json()
    // }).then(data=>{
    //     console.log('this is performances on event', data)
    //     res.json(data)
    // })
}

function createPerformance(req, res){
    console.log('Sending: ', req.body)
    postRequest(`http://yaem.store/robo/performances/performances.php`, req.body, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
    // fetch(`http://yaem.store/robo/performances/performances.php`, {
    //     method: 'POST',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': req.headers.token
    //     },
    //     body: JSON.stringify(req.body)
    // }).then(res=>{
    //     return res.json()
    // }).then(data=>{
    //     console.log('this is performances on event', data)
    //     res.json(data)
    // })
}
function updatePerformance(req, res){
    console.log('Sending upd: ', req.body)
    putReguest(`http://yaem.store/robo/performances/performances.php`, req.body, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
    // fetch(`http://yaem.store/robo/performances/performances.php`, {
    // method: 'PUT',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': req.headers.token
    //     },
    //     body: JSON.stringify(req.body)
    // }).then(res=>{
    //     return res.json()
    // }).then(data=>{
    //     console.log('this is performances on event', data)
    //     res.json(data)
    // })
}

function deletePerformance(req, res){
    console.log('will delete', req.body.id)
    deleteRequest(`http://yaem.store/robo/performances/performances.php?id=${req.body.id}`, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
    // fetch(`http://yaem.store/robo/performances/performances.php?id=${req.body.id}`, {
    // method: 'DELETE',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': req.headers.token
    //     }
    // }).then(res=>{
    //     return res.json()
    // }).then(data=>{
    //     console.log('Performance deleted', data)
    //     res.json(data)
    // })
}

export {
    getPerformances, 
    createPerformance, 
    updatePerformance, 
    deletePerformance
}