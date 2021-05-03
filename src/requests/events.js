import {sendRequest} from './facade'

function getEvets(organizationId){
    return sendRequest({
        method: 'GET',
        url: `/api/events?organizationId=${organizationId}`,
        token: localStorage.token
    })
}

function postEvent(data){
    return sendRequest({
        method: 'POST',
        url: '/api/create-new-event',
        data: data,
        token: localStorage.token
    })
}

function putEvent(data){
    return sendRequest({
        method: 'PUT',
        url: '/api/update-event',
        data: data,
        token: localStorage.token
    })
}



export {
    getEvets,
    postEvent,
    putEvent
}