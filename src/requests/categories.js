import {sendRequest} from './facade'

function getCategories(){
    return sendRequest({
        method: 'GET',
        url: `/api/get-categories`,
        token: localStorage.token
    })
}



export {
    getCategories
}