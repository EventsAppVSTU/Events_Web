import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getOrganizations(req, res){
    console.log('😅 getting organizations')
    getRequest('http://yaem.store/robo/events/organizations.php').then(data=>{
        console.log(data)
        res.json(data)
    })
}

function createOrganization(req, res){
    postRequest('http://yaem.store/robo/events/organizations.php', req.body).then(response=>{
        console.log(response)
        res.json(response);
    })
}

function updateOrganization(req, res){
    console.log('i will create organization', req.body)
    putReguest('http://yaem.store/robo/events/organizations.php', req.body).then(response=>{
        res.json(response);
    })
}

function deleteOrganization(req, res){
    console.log('😅 getting organizations')
    deleteRequest(`http://yaem.store/robo/events/organizations.php?id=${req.query.id}`).then(response=>{
        console.log(response)
        res.json(response);
    })
}
export {
    getOrganizations, 
    createOrganization, 
    updateOrganization, 
    deleteOrganization
}