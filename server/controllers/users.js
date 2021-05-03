import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';
import {getRequest, postRequest, putReguest, deleteRequest} from '../helpers/request.js'

function getUsers(req, res){
    console.log('getting users........')
    getRequest('http://yaem.store/robo/users/userCredentals.php', req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
    // fetch('http://yaem.store/robo/users/userCredentals.php', {
    //     method: 'GET',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': req.headers.token
    //     }
    // }).then(res=>{
    //     var data = res.json();
    //     console.log('RESPONSE_User: ', data);
    //     return data
    // }).then(data=>{
    //     console.log('this is data: ', data);
    //     res.json(data);
    // })
}
function getAdmins(req, res){
    getRequest(`http://yaem.store/robo/users/userCredentalsInfo.php?role=${req.query.role}`, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
}
function getUserById(req, res){
    console.log('getting user.')
    getRequest(`http://yaem.store/robo/users/userCredentalsInfo.php?id=${req.query.userId}`, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
}

function createUser(req, res){
    console.log('creating user........')
    var data = {
        name: req.body.name,
        surname: req.body.surname,
        image: req.body.image,
        organization_id: req.body.organization_id,
        login: req.body.login,
        password: req.body.password,
        bio: req.body.bio,
        web_link: req.body.web_link,
        role: req.body.role,
        organization_id: req.body.organization_id,
        organization_verify: req.body.organization_verify,
        phone:  req.body.phone,
        current_event: null
        
    }
    
    console.log('this data I will send: ', data);

    postRequest('http://yaem.store/robo/users/userCredentals.php', data, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
    // fetch('http://yaem.store/robo/users/userCredentals.php', {
    //     method: 'POST', // метод POST 
    //     headers: new Headers({
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         // 'Authorization': '1 111111_2',
    //     }),
    //     body: JSON.stringify(data),  
    // }).then(response=>{
    //     console.log('RESPONSE', response);
    //     return response.json();
    // }).then(smth=>{
    //     console.log('smth:   ', smth)
        
    // })
    // res.redirect('/')
}
function updateUser(req, res){
    console.log('edit user........')
    var data = {
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        image: req.body.image,
        organization_id: req.body.organization_id,
        login: req.body.login,
        password: req.body.password,
        
        role: req.body.role,
        current_event: req.body.current_event,
        organization_verify: req.body.organization_verify,
        phone: req.body.phone,
        bio: req.body.bio,
        web_link: req.body.web_link
    }
    
    console.log('this data I will send: ', data);
    putReguest('http://yaem.store/robo/users/userCredentals.php', data, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
    // fetch('http://yaem.store/robo/users/userCredentals.php', {
    //     method: 'PUT', // метод POST 
    //     headers: new Headers({
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Authorization': req.headers.token,
    //     }),
    //     body: JSON.stringify(data),  
    // }).then(response=>{
    //     console.log('RESPONSE', response);
    //     return response.json();
    // }).then(smth=>{
    //     console.log('smth:   ', smth)
        
    // })
    // res.redirect('/')
}
function deleteUser(req, res){
    console.log('getting users........');
    console.log('user id = ', req.query.id);
    deleteRequest(`http://yaem.store/robo/users/userCredentals.php?id=${req.query.id}`, req.headers.token).then(data=>{
        console.log(data)
        res.json(data)
    }).catch(err=>{
        res.json(err);
    })
    // fetch(`http://yaem.store/robo/users/userCredentals.php?id=${req.query.id}`, {
    //     method: 'DELETE',
    //     headers: new Headers( { 
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Accept': 'application/json',
    //         'Authorization': req.headers.token
    //     })
    // }).then(res=>{
    //     var data = res.json();
    //     console.log('RESPONSE_User: ', data);
    //     return data
    // }).then(data=>{
    //     console.log('this is data: ', data);
    //     res.json(data);
    // })
}
export{
    getUsers, 
    getAdmins,
    getUserById,
    createUser, 
    updateUser,
    deleteUser
}