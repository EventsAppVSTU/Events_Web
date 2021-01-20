import fetch from 'node-fetch';

function getRequest(url){
    return request(url, 'GET')
}

function postRequest(url, data){
    return request(url, 'POST', data)
}

function putReguest(url, data){
    return request(url, 'PUT', data)
}

function deleteRequest(url){
    return request(url, 'DELETE')
}

function request(url, method, data){
    return new Promise(function(resolve, reject){
        var requestObject = {}; 
        if(method == 'POST' || method == 'PUT'){
            requestObject = {
                method: method, // метод PUT 
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': '1 111111_2',
                }),
                body: JSON.stringify(data)  
            }
        
        }
        else{
            requestObject = {
                method: method, // метод PUT 
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': '1 111111_2'
                }
            }
        }
        fetch(url, requestObject).then(res=>{
            var data = res.json();
            // console.log('RESPONSE: ', data);
            return data
        }).then(data=>{
            // console.log('this is data: ', data);
            resolve(data)
        }).catch(error=>{
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