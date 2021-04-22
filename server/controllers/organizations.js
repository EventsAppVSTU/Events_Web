import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getOrganizations(req, res){
    console.log('😅 getting organizations')
    getRequest('http://yaem.store/robo/events/organizations.php', req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
}

function createOrganization(req, res){
    postRequest('http://yaem.store/robo/events/organizations.php', req.body, req.headers.token).then(response=>{
        console.log(response)
        res.json(response);
    }).catch(err=>{
        res.json(err);
    })
}

function updateOrganization(req, res){
    console.log('i will create organization', req.body)
    putReguest('http://yaem.store/robo/events/organizations.php', req.body, req.headers.token).then(response=>{
        res.json(response);
    }).catch(err=>{
        res.json(err);
    })
}

function deleteOrganization(req, res){
    console.log('😅 getting organizations')
    deleteRequest(`http://yaem.store/robo/events/organizations.php?id=${req.query.id}`, req.headers.token).then(response=>{
        console.log(response)
        res.json(response);
    }).catch(err=>{
        res.json(err);
    })
}
export {
    getOrganizations, 
    createOrganization, 
    updateOrganization, 
    deleteOrganization
}