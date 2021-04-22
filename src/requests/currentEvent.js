import {sendRequest} from './facade'

function getCurrentEvent(){
    return sendRequest({
        method: 'GET',
        url: `/api/get-current-event-by-id?userId=${localStorage.userId}`,
        token: localStorage.token
    })
}

function setCurrentEvent(){
    return sendRequest({
        method: 'POST',
        url: '',
        token: localStorage.token
    })
}



export {
    getCurrentEvent,
    setCurrentEvent
}