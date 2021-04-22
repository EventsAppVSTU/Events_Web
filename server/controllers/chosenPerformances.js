// getChosePerformances
import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getChosenPerformances(req, res){
    console.log('😅 getting organizations')

    getRequest(`http://yaem.store/robo/performances/choosenPerformancesInfo.php?event_id=${req.query.event_id}`, req.headers.token).then(data=>{
        console.log('RESPONSE: ', data);    
        res.json(data);
    }).catch(err=>{
        res.json(err);
    })

}

export {
    getChosenPerformances
}