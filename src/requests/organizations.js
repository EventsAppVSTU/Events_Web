import {sendRequest} from './facade'

function getOrganizations(){
    return sendRequest({
        method: 'GET',
        url: '/api/get-organizations',
        token: localStorage.token
    })
}



export {
    getOrganizations
}