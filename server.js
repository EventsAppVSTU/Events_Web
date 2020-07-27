const express = require('express');//для роутинга
const app = express();
const bodyParser = require('body-parser');//для парсинга в роутинге

const fetch = require('node-fetch');
global.Headers = fetch.Headers;

app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
console.log("hello!!!!! how are you ?))))")

app.use(express.static('public'));


//_________start server_________
// app.listen(3000, err => {
//     if (!err) console.log('Server started on 3000 port');
//     else console.error('Server not started');
// })
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//___________routes__________
app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
    res.sendFile(__dirname + '/index.html/')
})
app.get('/api', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
    // res.send('hahaahahahh')
})

//С сервером работает
app.get('/api/events', urlencodedParser, (req, res)=>{
    console.log('😅 getting events')
    // fetch('http://yaem.online/robo/events/events.php', {
    //     method: 'GET',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': '1 111111_2'
    //     }
    // }).then(res=>{
    //     var data = res.json();
    //     console.log('RESPONSE: ', data);
    //     return data
    // }).then(data=>{
    //     console.log('this is data: ', data);
    //     res.json(data);
    // })
    fetch('http://yaem.online/robo/events/eventsInfo.php', {
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
})

//С сервером работает. Создание события
app.post('/api/create-new-event', urlencodedParser, (req, res)=>{
    console.log('🤨🤨😭 what is goin on?')
    var data = {
        name: req.body.name,
        description: req.body.description,
        startDate: '2020-05-01 00:00:00',
        endDate: '2020-05-02 00:00:00',
        image: req.body.image,
        place: req.body.place,
        category_id: req.body.category_id
    }
    
    console.log('this data I will send: ', data);

    fetch('http://yaem.online/robo/events/events.php', {
        method: 'POST', // метод POST 
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
    
    res.redirect('/');


})

//_____________________ НОВОСТИ__________________________
//_______________________________________________________

app.get('/api/event-news', urlencodedParser, (req, res)=>{
    console.log('😅 getting events news ', req.query.event_id)
    fetch(`http://yaem.online/robo/events/eventNews.php?event_id=${req.query.event_id}`, {
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
})

//__________Добавить новость________________
app.post('/api/create-news', urlencodedParser, (req, res)=>{
    console.log('🤨🤨😭 what is goin on?')
    var data = {
        event_id: req.body.event_id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    }
    
    console.log('this data I will send: ', data);

    fetch('http://yaem.online/robo/events/eventNews.php', {
        method: 'POST', // метод POST 
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
    
    res.redirect('/');

})
app.post('/api/delete-event-news', urlencodedParser, (req, res)=>{
    if(req.body.id != undefined){
            //удалить текущие событие у админа
        //Удалить событие
        console.log('will delete')
        fetch(`http://yaem.online/robo/events/eventNews.php?id=${req.body.id}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
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
})

//____________________Текущее событие______________________
//_________________________________________________________

// Запрос текущего события админимтратора 1
app.get('/api/get-current-event-by-id', urlencodedParser, (req, res)=>{
    console.log('🧑‍💻 user', req.query.user)
    fetch('http://yaem.online/robo/users/userCredentals.php?id=1', {
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
        fetch(`http://yaem.online/robo/events/events.php?id=${data.data.objects[0].current_event}`, {
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

} )

//Установка текущего события. Роботает
app.get('/api/set-current-event-by-id', urlencodedParser, (req, res)=>{
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

    fetch('http://yaem.online/robo/users/userCredentals.php?id=1', {
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

        fetch('http://yaem.online/robo/users/userCredentals.php', {
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
})

//Обновить событие
app.post('/api/update-event', urlencodedParser, (req, res)=>{
    
    var data = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        image: req.body.image,
        place: req.body.place,
        category_id: req.body.category_id
    }
    
    console.log('this data I will send: ', data);

    fetch('http://yaem.online/robo/events/events.php', {
        method: 'PUT', // метод PUT 
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': '1 111111_2',
        }),
        body: JSON.stringify(data),  
    }).then(response=>{
        console.log('RESPONSE', response);
        return response.json();
    }).then(smth=>{
        console.log('smth:   ', smth);
        res.json(smth);
    })
    
})

//Удалить событие
app.post('/api/delete-event-by-id', urlencodedParser, (req, res)=>{
    console.log('delete events', req.body.id)
    // удалить выступления
    if(req.body.id != undefined){
        //удалить текущие событие у админа
        //Удалить событие
        console.log('will delete')
        fetch(`http://yaem.online/robo/events/events.php?id=${req.body.id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
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
    
})

//____________Выступления. _____________________
//____________________________________________________

//Новое
app.get('/api/get-performances-by-id', urlencodedParser, (req, res)=>{
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

})

//новое
app.post('/api/create-performance-by-id', urlencodedParser, (req, res)=>{
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
    
})

app.post('/api/update-performance-by-id', urlencodedParser, (req, res)=>{
    
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
})

app.post('/api/delete-performance-by-id', urlencodedParser, (req, res)=>{
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
})



//_____________________Пользователи________________________
//______________________________________________________

//Запрос таблицы всех пользователей
app.get('/api/get-users', (req, res)=>{
    console.log('getting users........')
    fetch('http://yaem.online/robo/users/userCredentals.php', {
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
});

//Создание пользователя
app.post('/api/create-user', (req, res)=>{
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

    fetch('http://yaem.online/robo/users/userCredentals.php', {
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
})

//Редактирование пользователя
app.post('/api/edit-user', (req, res)=>{
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

    fetch('http://yaem.online/robo/users/userCredentals.php', {
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
})

//Удаление пользователя
app.get('/api/delete-user', (req, res)=>{
    console.log('getting users........');
    console.log('user id = ', req.query.id);
    fetch(`http://yaem.online/robo/users/userCredentals.php?id=${req.query.id}`, {
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
});


//______________Выбраные События____________________
//___________________________________________________ 

//ЗАгрузка
app.get('/api/get-сhosen-events', urlencodedParser, (req, res)=>{
    console.log('😅 getting organizations')
    fetch(' http://yaem.online/robo/events/choosenEvents.php', {
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
});
//_____________________Организации________________________
//________________________________________________________

//Запрос списка организаций
app.get('/api/get-organizations', urlencodedParser, (req, res)=>{
    console.log('😅 getting organizations')
    fetch('http://yaem.online/robo/events/organizations.php', {
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
});

//Добавление организации
app.post('/api/create-organization', urlencodedParser, (req, res)=>{
console.log('i will create organization', req.body)
    fetch('http://yaem.online/robo/events/organizations.php',{
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }),
        body: JSON.stringify(req.body)
    }).then(res=>{
        console.log(res);
        return res.json();
    }).then(data=>{
        res.json(data);
    })
});

//Удаление организации
app.get('/api/delete-organization', urlencodedParser, (req, res)=>{
    console.log('😅 getting organizations')
    fetch(`http://yaem.online/robo/events/organizations.php?id=${req.query.id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        var data = res.json();
        console.log('RESPONSE: ', data);
        return data;
    }).then(data=>{
        console.log('this is data: ', data);
        res.json(data);
    })
});

//Редактирование организации
app.post('/api/edit-organization', urlencodedParser, (req, res)=>{
    console.log('i will create organization', req.body)
        fetch('http://yaem.online/robo/events/organizations.php',{
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': '1 111111_2'
            }),
            body: JSON.stringify(req.body)
        }).then(res=>{
            console.log(res);
            return res.json();
        }).then(data=>{
            res.json(data);
        })
});

//_____________________Категории________________________
//______________________________________________________

//Запрос списка категорий
app.get('/api/get-categories', urlencodedParser, (req, res)=>{
    console.log('😅 getting categories')
    fetch('http://yaem.online/robo/events/eventsCategories.php', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        var data = res.json();
        console.log('RESPONSE: ', data);
        return data;
    }).then(data=>{
        console.log('this is data: ', data);
        res.json(data);
    })
});

//Добавление категории
app.post('/api/create-category', urlencodedParser, (req, res)=>{
    console.log('i will create category', req.body)
        fetch('http://yaem.online/robo/events/eventsCategories.php',{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': '1 111111_2'
            }),
            body: JSON.stringify(req.body)
        }).then(res=>{
            console.log(res);
            return res.json();
        }).then(data=>{
            res.json(data);
        })
});

//Удаление категории
app.get('/api/delete-category', urlencodedParser, (req, res)=>{
    console.log('😅 getting category')
    fetch(`http://yaem.online/robo/events/eventsCategories.php?id=${req.query.id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        // var data = res.json();
        // console.log('RESPONSE: ', data);
        return res;
    }).then(data=>{
        console.log('this is data: ', data);
        res.json(data);
    })
});

//Редактирование категории
app.post('/api/edit-category', urlencodedParser, (req, res)=>{
    console.log('i will create category', req.body)
    fetch('http://yaem.online/robo/events/eventsCategories.php',{
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }),
        body: JSON.stringify(req.body)
    }).then(res=>{
        console.log(res);
        return res.json();
    }).then(data=>{
        res.json(data);
    })
});


//____________SIGN IN_________________
app.post('/api/sign-in', urlencodedParser, (req,res)=>{
    console.log('AUTH')
    var userLogin = '';
    var userPassword = '';
    //найти юзера по логину (так как пока нет такого фильтра, то искать по id.)
    fetch('http://yaem.online/robo/users/userCredentals.php?id=1', {
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
        userPassword = data.data.objects[0].password;
        userLogin = data.data.objects[0].login;
        
         //сравнить сравнить введеный пароль (1 111111_2) с хэшом из БД на сервере И логин с клиента с логином БД.
         //вернуть ответ клиенту.
        if(userPassword != '' && userLogin != ''){
            if(userPassword== req.body.password ){
                res.json({hash: userPassword})
                console.log('GOOD')
            }
            else{
                console.log('DB password', userPassword)
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
   

    
        
})
app.post('/api/auth', urlencodedParser, (req, res)=>{
    console.log('AUTH', req.headers.authorization)
    if(req.headers.authorization == '111111_2'){
        res.json({isLog: true})
    }
    else{
        res.json({isLog: false})
    }
})