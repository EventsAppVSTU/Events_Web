import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';

function getUsers(req, res){
    console.log('getting users........')
    fetch('http://yaem.store/robo/users/userCredentals.php', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        var data = res.json();
        console.log('RESPONSE_User: ', data);
        return data
    }).then(data=>{
        console.log('this is data: ', data);
        res.json(data);
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
    }
    
    console.log('this data I will send: ', data);

    fetch('http://yaem.store/robo/users/userCredentals.php', {
        method: 'POST', // метод POST 
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': '1 111111_2',
        }),
        body: JSON.stringify(data),  
    }).then(response=>{
        console.log('RESPONSE', response);
        return response.json();
    }).then(smth=>{
        console.log('smth:   ', smth)
        
    })
    res.redirect('/')
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
    }
    
    console.log('this data I will send: ', data);

    fetch('http://yaem.store/robo/users/userCredentals.php', {
        method: 'PUT', // метод POST 
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': '1 111111_2',
        }),
        body: JSON.stringify(data),  
    }).then(response=>{
        console.log('RESPONSE', response);
        return response.json();
    }).then(smth=>{
        console.log('smth:   ', smth)
        
    })
    res.redirect('/')
}
function deleteUser(req, res){
    console.log('getting users........');
    console.log('user id = ', req.query.id);
    fetch(`http://yaem.store/robo/users/userCredentals.php?id=${req.query.id}`, {
        method: 'DELETE',
        headers: new Headers( { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        })
    }).then(res=>{
        var data = res.json();
        console.log('RESPONSE_User: ', data);
        return data
    }).then(data=>{
        console.log('this is data: ', data);
        res.json(data);
    })
}
export{
    getUsers, 
    createUser, 
    updateUser,
    deleteUser
}