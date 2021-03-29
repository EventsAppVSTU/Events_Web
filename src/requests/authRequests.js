import {sendRequest} from './facade'

function signIn(data){
    return sendRequest({
        method: 'POST',
        url: '/api/sign-in',
        data: data,
        // token: localStorage.token
    })
}



export {
    signIn,
}