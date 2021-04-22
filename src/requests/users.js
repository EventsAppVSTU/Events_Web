import {sendRequest} from './facade'


function getUserById(userId){
    return sendRequest({
        method: 'GET',
        url: `/api/get-user-by-id?userId=${userId}`,
        // token: localStorage.token
    })
}



export {
    getUserById
}