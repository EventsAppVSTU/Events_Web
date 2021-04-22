import fetch from 'node-fetch';

function getRequest(url, token){
    return request(url, 'GET', '', token)
}

function postRequest(url, data, token){
    return request(url, 'POST', data, token)
}

function putReguest(url, data, token){
    return request(url, 'PUT', data, token)
}

function deleteRequest(url, token){
    return request(url, 'DELETE', '', token)
}

function request(url, method, data, token){
    return new Promise(function(resolve, reject){
        var requestObject = {}; 
        if(method == 'POST' || method == 'PUT'){
            requestObject = {
                method: method, // метод PUT 
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token,
                }),
                body: JSON.stringify(data)  
            }
        
        }
        else{
            requestObject = {
                method: method, // метод PUT 
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': token,
                }),
            }
        }
        fetch(url, requestObject).then(res=>{
            console.log('req: ', url);
            console.log('req: ', requestObject);
            console.log('TEEEEEEXT', )
            var data = res.json();
            console.log('this is data: ', data);
            return data
        }).then(data=>{
            resolve(data)
        }).catch(error=>{
            console.log('че такое', error);
            reject(error)
        })

    })
}


export {
    getRequest,
    postRequest,
    putReguest,
    deleteRequest
}