import {sendRequest} from './facade'

function getNews(eventId){
    return sendRequest({
        method: 'GET',
        url: `/api/event-news?event_id=${eventId}`,
        token: localStorage.token
    })
}

function postNews(data){
    return sendRequest({
        method: 'POST',
        url: '/api/create-news',
        data: data,
        token: localStorage.token
    })
}

// function putNews(data){
//     return sendRequest({
//         method: 'PUT',
//         url: '/api/update-event',
//         data: data,
//         token: localStorage.token
//     })
// }

function deleteNews(id){
    return sendRequest({
        method: 'DELETE',
        url: `/api/delete-event-news?id=${id}`,
        token: localStorage.token
    })
}



export {
    getNews,
    postNews,
    deleteNews
}