

const currentEventRequests = {
    getCurrentEvent(){
        // из currentEvent
        console.log('getting...')
        return new Promise((resolve, reject)=>{
        fetch('/api/get-current-event-by-id?user=admin').then(res=>{
                if(res.ok){
                    var data = res.json();
                    console.log('OK')
                    return data;
                }
                else{
                    console.log('er get rooms :(');
                    throw new Error ('er');
                }
            }).then(data=>{
                console.log('current event data',data.data.objects[0])
                resolve(data.data.objects[0])
            }).catch(error=>{
                reject(error)
            })

        })
    },
    deleteCurrentEvent(id){
        var data = { id: Number } 
        data.id = id
         fetch('/api/delete-event-by-id', {
            credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
            method: 'POST',              // метод POST 
            body: JSON.stringify(data),  // типа запрашиаемого документа
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res=>{
            console.log(res)
            this.currentEvent.name = 'Событие не выбранно'
          })
      },
    install: function(Vue){
      Object.defineProperty(Vue.prototype, 'currentEventRequests', {
        get () { return currentEventRequests }
      })
    }
  }
  
  
  export default currentEventRequests