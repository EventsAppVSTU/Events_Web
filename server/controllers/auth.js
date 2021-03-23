import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';

function signIn(req, res){
    console.log('AUTH')
    var userLogin = '';
    var userPassword = '';
    //найти юзера по логину (так как пока нет такого фильтра, то искать по id.)
    fetch('http://yaem.store/robo/users/userCredentals.php?id=1', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        console.log('RESPONSE: ', res);
        var data = res.json();
        console.log('RESPONSE data: ', data);
        return data;
    }).then(data=>{
        console.log('this is data: ', data.data.objects[0].password);
        const userData= data.data.objects[0];
        const userDataIsNotEmpty = userData.password != '' && userData.login != '';

        if(userDataIsNotEmpty){
            if(userData.password == req.body.password ){
                res.json({hash: userData.password})
                console.log('GOOD')
            }
            else{
                console.log('DB password', userData.password)
                res.json({hash: ''})
                console.log('EMPTY')
            }
        }
        else{
            res.json({hash: 'No user found'})
            console.log('NOT FOUND')
        }
    }).catch(error=>{
        console.log(error)
    })
}

function auth(req, res){
    console.log('AUTH', req.headers.authorization)
    if(req.headers.authorization == '111111_2'){
        res.json({isLog: true})
    }
    else{
        res.json({isLog: false})
    }
}

export {
    signIn,
    auth
}