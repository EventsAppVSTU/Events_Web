function sendRequest(req){
    return new Promise(function(resolve, reject){
        var requestObject = requestGenerator(req.method, req.data, req.token, req.contentType)
        fetch(req.url, requestObject).then(res=>{
            var data = res.json();
            // console.log('RESPONSE: ', data);
            return data
        }).then(data=>{
            // console.log('this is data: ', data);
            resolve(data)
        }).catch(error=>{
            console.log('403 happend')
            reject(error)
        })

    })
}

function requestGenerator(method, data, token){
    var requestObject = {}; 

        if(method == 'POST' || method == 'PUT'){
            
            requestObject = {
                method: method, // метод POST, PUT
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'Token': localStorage.hash
                }),
                body: JSON.stringify(data)  
            }
            console.log('Generated requestd onject: ', requestObject)
        }
        else{
            console.log('Get or delete method generation', requestObject)
            requestObject = {
                method: method, // метод GET, DELETE
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token,
                    'Token': localStorage.hash
                }
            }
        }
        return requestObject
}
export {
    sendRequest
}