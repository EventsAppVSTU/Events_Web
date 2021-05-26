import {sendRequest} from './facade'

function getBidsStates(){
    return sendRequest({
        method: 'GET',
        url: `/api/bidsStates`,
        token: localStorage.token
    })
}

function postBidsState(data){
    return sendRequest({
        method: 'POST',
        url: `/api/bidsStates`,
        data: data,
        token: localStorage.token
    })
}

function putBidsState(data){
    return sendRequest({
        method: 'PUT',
        url: `/api/bidsStates`,
        data: data,
        token: localStorage.token
    })
}

function deleteBidsState(id){
    return sendRequest({
        method: 'DELETE',
        url: `/api/bidsStates?id=${id}`,
        token: localStorage.token
    })
}



export {
    getBidsStates, 
    postBidsState, 
    putBidsState, 
    deleteBidsState
}