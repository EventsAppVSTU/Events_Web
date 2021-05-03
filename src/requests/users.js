import {sendRequest} from './facade'


function getUserById(userId){
    return sendRequest({
        method: 'GET',
        url: `/api/get-user-by-id?userId=${userId}`,
        // token: localStorage.token
    })
}

// 1. Как получить список администраторов? (для Супервайзера)
// 2. Как создать администратора? (Супервайзер)

// В заявках на приветные события изменить права: (создание - все, удаление - все, редактирование - а смысл?)
// Нету поля код доступа в заявках

// Запрос GET событий. по организации. сейчас выдается вообще все

//📌 сейчас сделать обновление current event

function getUsers(){
    return sendRequest({
        method: 'GET',
        url: '/api/get-users',
        token: localStorage.token
    })   
}

function getAdmins(role){
    return sendRequest({
        method: 'GET',
        url: `/api/get-admins?role=${role}`,
        token: localStorage.token
    })
}

function deleteUser(userId){
    return sendRequest({
        method: 'DELETE',
        url: `/api/delete-user?id=${userId}`,
        token: localStorage.token
    })
}

function putUser(user){
    return sendRequest({
        method: 'PUT',
        url: '/api/edit-user',
        data: user, 
        token: localStorage.token
    })
}

function postUser(user){
    return sendRequest({
        method: 'POST',
        url: '/api/create-user',
        data: user,
        token: localStorage.token
    })
}



export {
    getUserById,
    getAdmins,
    getUsers,
    putUser,
    postUser,
    deleteUser
}