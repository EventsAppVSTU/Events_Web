import {getRequest} from '../helpers/request.js'

test('get request', () => {
    // expect(getRequest('http://yaem.store/robo/events/eventsInfo.php').then(data=>{
    //     return data
    // })).not.toBe(undefined); //.not.toBe(undefined)

    
    getRequest('http://yaem.store/robo/events/eventsInfo.php').then(data=>{
        expect(data).not.toBe(undefined);
    })

});
  
// it('works with resolves', () => {
//     expect.assertions(1);
//     return expect(getRequest('http://yaem.store/robo/events/eventsInfo.php').then(data=>{
//                 return data.data
//                 })).toHaveProperty('objects');
// });