import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';

function getCurrentEvent(req, res){
    console.log('🧑‍💻 user', req.query.user)
    fetch('http://yaem.store/robo/users/userCredentals.php?id=1', {
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
        console.log('current event: ', data.data.objects[0].current_event)
        fetch(`http://yaem.store/robo/events/events.php?id=${data.data.objects[0].current_event}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
        }).then(res=>{
            var data = res.json();
            console.log('RESPONSE current event: ', data);
            return data
        }).then(data=>{
            console.log('this is data cur ev: ', data);
            res.json(data);
        })
    })
}

function setCurrentEvent(req, res){
    console.log('set event')
    console.log('edit user........')
    var dataToUpdate = {
        id: 1, //1 - устанавливаем для Администратора
        name: '',
        surname: '',
        image: '',
        organization_id: '',
        current_event: req.query.event,
        login: '',
        password: '',
    }

    fetch('http://yaem.store/robo/users/userCredentals.php?id=1', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        var data = res.json();
        // console.log('RESPONSE_User: ', data);
        return data;
    }).then(data=>{
        console.log('this is data: ', data.data.objects[0]);
        dataToUpdate.name = data.data.objects[0].name;
        dataToUpdate.surname = data.data.objects[0].surname;
        dataToUpdate.image = data.data.objects[0].image;
        dataToUpdate.organization_id = data.data.objects[0].organization_id;
        dataToUpdate.current_event = req.query.event;
        dataToUpdate.login = data.data.objects[0].login;
        dataToUpdate.password = data.data.objects[0].password;

        fetch('http://yaem.store/robo/users/userCredentals.php', {
        method: 'PUT', // метод POST 
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': '1 111111_2',
        }),
        body: JSON.stringify(dataToUpdate),  
        }).then(response=>{
            console.log('RESPONSE se cur event: ', response);
            return response.json();
        }).then(smth=>{
            console.log('smth ev:   ', smth)
            
        })
    })
    
        res.redirect('/#/home')
}


export {
    getCurrentEvent,
    setCurrentEvent, 
    
}