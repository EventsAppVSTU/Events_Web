// console.log('Code: ',genRandomCode())

function genRandomCode(){
    const min = 999
    const max = 10000
    return String(Math.floor(Math.random() * (max - min)) + min)
  }
  
export {
    genRandomCode
}