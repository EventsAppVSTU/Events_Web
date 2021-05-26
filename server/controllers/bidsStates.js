import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getBidsStates(req, res){
    console.log('😅 getting categories')
    getRequest('http://yaem.store/robo/events/bidsStates.php', req.headers.token).then(data=>{
        console.log('RESPONSE: ', data);    
        res.json(data);
    }).catch(err=>{
        res.json(err);
    })
}

function createBidsState(req, res){
    console.log('Сосздам статус', req.body)
    console.log('http://yaem.store/robo/events/bidsStates.php')
    postRequest('http://yaem.store/robo/events/bidsStates.php', req.body, req.headers.token).then(data=>{
        console.log('RESPONSE: ', data);    
        res.json(data);
    }).catch(err=>{
        res.json(err);
    })

}

function updateBidsState(req, res){
    console.log('i will create category', req.body)
    putReguest('http://yaem.store/robo/events/bidsStates.php', req.body, req.headers.token).then(data=>{
        console.log('RESPONSE: ', data);    
        res.json(data);
    }).catch(err=>{
        res.json(err);
    })

}

function deleteBidsState(req, res){
    console.log('😅 getting category')
    deleteRequest(`http://yaem.store/robo/events/bidsStates.php?id=${req.query.id}`, req.headers.token).then(data=>{
        console.log('RESPONSE: ', data);    
        res.json(data);
    }).catch(err=>{
        res.json(err);
    })
}

export {
    getBidsStates, 
    createBidsState, 
    updateBidsState, 
    deleteBidsState
}