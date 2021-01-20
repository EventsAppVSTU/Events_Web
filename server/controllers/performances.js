import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';

function getPerformances(req, res){
    fetch(`http://yaem.online/robo/performances/performances.php?event_id=${req.query.event}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        return res.json()
    }).then(data=>{
        console.log('this is performances on event', data)
        res.json(data)
    })
}

function createPerformance(req, res){
    console.log('Sending: ', req.body)
    fetch(`http://yaem.online/robo/performances/performances.php`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        },
        body: JSON.stringify(req.body)
    }).then(res=>{
        return res.json()
    }).then(data=>{
        console.log('this is performances on event', data)
        res.json(data)
    })
}
function updatePerformance(req, res){
    console.log('Sending upd: ', req.body)
    fetch(`http://yaem.online/robo/performances/performances.php`, {
    method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        },
        body: JSON.stringify(req.body)
    }).then(res=>{
        return res.json()
    }).then(data=>{
        console.log('this is performances on event', data)
        res.json(data)
    })
}

function deletePerformance(req, res){
    console.log('will delete', req.body.id)
    fetch(`http://yaem.online/robo/performances/performances.php?id=${req.body.id}`, {
    method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        return res.json()
    }).then(data=>{
        console.log('Performance deleted', data)
        res.json(data)
    })
}

export {
    getPerformances, 
    createPerformance, 
    updatePerformance, 
    deletePerformance
}