import {sendRequest} from './facade'


function getPerformances(eventId){
    return sendRequest({
        method: 'GET',
        url: `/api/get-performances-by-id?event=${eventId}`,
        token: localStorage.token
    })
}



export {
    getPerformances
}