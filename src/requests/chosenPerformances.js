import {sendRequest} from './facade'

function getChosenPerformances(eventId){
    return sendRequest({
        method: 'GET',
        url: `/api/chosenPerformances?event_id=${eventId}`,
        token: localStorage.token
    })
}



export {
    getChosenPerformances
}