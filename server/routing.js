import bodyParser from 'body-parser';
const urlencodedParser = bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';

import {getEvets, createNewEvent, updateEvent, deleteEvent} from './controllers/events.js'
import {getEventNews, createNews, deleteEventNews} from './controllers/news.js'
import {getCurrentEvent, setCurrentEvent} from './controllers/currentEvent.js'
import {getPerformances, createPerformance, updatePerformance, deletePerformance} from './controllers/performances.js'
import {getUsers, createUser, updateUser, deleteUser, getUserById, getAdmins} from './controllers/users.js'
import {getChosenEvents} from './controllers/chosenEents.js'
import {getOrganizations, createOrganization, updateOrganization, deleteOrganization} from './controllers/organizations.js'
import {getCategories, createCategory, updateCategory, deleteCategory} from './controllers/categories.js'
import {signIn, auth} from './controllers/auth.js'

import {getChosenPerformances} from './controllers/chosenPerformances.js'

import {acceptUserOnEvent, declineUserRequest, getBids} from './controllers/privateEvent.js'
import { createBidsState, deleteBidsState, getBidsStates, updateBidsState } from './controllers/bidsStates.js';

export default (app)=>{
    //___________routes__________
app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
    res.sendFile('/dist/index.html')
    // __dirname + '/index.html/'
})
app.get('/api', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
    // res.send('hahaahahahh')
})

//____________________События____________________________
//_______________________________________________________
app.get('/api/events', urlencodedParser, getEvets)

app.post('/api/create-new-event', urlencodedParser, createNewEvent)


//_____________________ НОВОСТИ__________________________
//_______________________________________________________

app.get('/api/event-news', urlencodedParser, getEventNews)
app.post('/api/create-news', urlencodedParser, createNews)
app.delete('/api/delete-event-news', urlencodedParser, deleteEventNews)

//____________________Текущее событие______________________
//_________________________________________________________

// Запрос текущего события админимтратора 1
app.get('/api/get-current-event-by-id', urlencodedParser, getCurrentEvent)

//Установка текущего события. Роботает
app.get('/api/set-current-event-by-id', urlencodedParser, setCurrentEvent)

//Обновить событие
app.put('/api/update-event', urlencodedParser, updateEvent)

//Удалить событие
app.post('/api/delete-event-by-id', urlencodedParser, deleteEvent)

//____________Выступления. _______________________________
//________________________________________________________

//Новое
app.get('/api/get-performances-by-id', urlencodedParser, getPerformances)

//новое
app.post('/api/create-performance-by-id', urlencodedParser, createPerformance)
app.post('/api/create-performance', urlencodedParser, createPerformance)

app.post('/api/update-performance-by-id', urlencodedParser, updatePerformance)

app.post('/api/delete-performance-by-id', urlencodedParser, deletePerformance)



//_____________________Пользователи________________________
//_________________________________________________________

//Запрос таблицы всех пользователей
app.get('/api/get-users', getUsers);
app.get('/api/get-admins', getAdmins);
app.get('/api/get-user-by-id', getUserById)

//Создание пользователя
app.post('/api/create-user', createUser)

//Редактирование пользователя
app.put('/api/edit-user', updateUser)

//Удаление пользователя
app.delete('/api/delete-user', deleteUser);


//______________Выбраные События____________________
//___________________________________________________ 

app.get('/api/get-chosen-events', urlencodedParser, getChosenEvents);

//______________Выбраные Выступления____________________
//___________________________________________________ 
app.get('/api/chosenPerformances', urlencodedParser, getChosenPerformances)

//_____________________Организации________________________
//________________________________________________________

//Запрос списка организаций
app.get('/api/get-organizations', urlencodedParser, getOrganizations);

//Добавление организации
app.post('/api/create-organization', urlencodedParser, createOrganization);

//Редактирование организации
app.post('/api/edit-organization', urlencodedParser, updateOrganization);

//Удаление организации
app.get('/api/delete-organization', urlencodedParser, deleteOrganization);


//_____________________Категории________________________
//______________________________________________________

//Запрос списка категорий
app.get('/api/get-categories', urlencodedParser, getCategories);

//Добавление категории
app.post('/api/create-category', urlencodedParser, createCategory);

//Редактирование категории
app.post('/api/edit-category', urlencodedParser, updateCategory);

//Удаление категории
app.get('/api/delete-category', urlencodedParser, deleteCategory);


//____________SIGN IN_________________
app.post('/api/sign-in', urlencodedParser, signIn)
app.post('/api/auth', urlencodedParser, auth)


//_____________________Приватные события________________
//______________________________________________________
app.get('/api/bids', urlencodedParser, getBids)
app.post('/api/private-event-accept',urlencodedParser, acceptUserOnEvent)
app.post('/api/private-event-decline',urlencodedParser, declineUserRequest)

//__________________Статусы заявок______________________
//______________________________________________________

app.get('/api/bidsStates', urlencodedParser, getBidsStates)
app.post('/api/bidsStates', urlencodedParser, createBidsState)
app.put('/api/bidsStates', urlencodedParser, updateBidsState)
app.delete('/api/bidsStates', urlencodedParser, deleteBidsState)

}

