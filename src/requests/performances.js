import {sendRequest} from './facade'


function getPerformances(eventId){
    return sendRequest({
        method: 'GET',
        url: `/api/get-performances-by-id?event=${eventId}`,
        token: localStorage.token
    })
}

function postPerformance(data){
    return sendRequest({
        method: 'POST',
        url: '/api/create-performance',
        data: data,
        token: localStorage.token
    })
}



export {
    getPerformances,
    postPerformance
}