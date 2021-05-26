import {sendRequest} from './facade'

function getUserRequests(){
    return sendRequest({
        method: 'GET',
        url: `/api/bids`,
        token: localStorage.token
    })
}

function acceptRequest(data){
    return sendRequest({
        method: 'POST',
        url: '/api/create-news',
        data: data,
        token: localStorage.token
    })
}

function declineRequest(id){
    return sendRequest({
        method: 'DELETE',
        url: `/api/delete-event-news?id=${id}`,
        token: localStorage.token
    })
}



export {
    getUserRequests,
    acceptRequest, 
    declineRequest
}