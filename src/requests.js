

const requests = {
  checkAuthorization(){
    console.log('cookie', localStorage.hash)
    return new Promise(function(resolve, reject){
      fetch('/api/auth', {
        credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
          method: 'POST',              // метод POST 
          // body: JSON.stringify(),  // типа запрашиаемого документа
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.hash
          })
      }).then(res=>{
        var data = res.json()
        return data
      }).then(data=>{
        // this.$root.isAuth = data.isLog
        resolve(data.isLog) 
        
        // this.isLog = true
      }).catch(error=>{
        reject(error)
      })
    })
  },
  install: function(Vue){
    Object.defineProperty(Vue.prototype, 'requests', {
      get () { return requests }
    })
  }
}


export default requests