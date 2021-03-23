import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';

function getChosenEvents(req, res){
    console.log('😅 getting organizations')
    
    fetch(' http://yaem.store/robo/events/choosenEvents.php', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
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

export {
    getChosenEvents
}