import bodyParser from 'body-parser';
bodyParser.urlencoded({extended: false})
import fetch from 'node-fetch';

function getCategories(req, res){
    console.log('😅 getting categories')
    fetch('http://yaem.online/robo/events/eventsCategories.php', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        var data = res.json();
        console.log('RESPONSE: ', data);
        return data;
    }).then(data=>{
        console.log('this is data: ', data);
        res.json(data);
    })
}

function createCategory(req, res){
    console.log('i will create category', req.body)
        fetch('http://yaem.online/robo/events/eventsCategories.php',{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': '1 111111_2'
            }),
            body: JSON.stringify(req.body)
        }).then(res=>{
            console.log(res);
            return res.json();
        }).then(data=>{
            res.json(data);
        })
}

function updateCategory(req, res){
    console.log('i will create category', req.body)
    fetch('http://yaem.online/robo/events/eventsCategories.php',{
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }),
        body: JSON.stringify(req.body)
    }).then(res=>{
        console.log(res);
        return res.json();
    }).then(data=>{
        res.json(data);
    })
}

function deleteCategory(req, res){
    console.log('😅 getting category')
    fetch(`http://yaem.online/robo/events/eventsCategories.php?id=${req.query.id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': '1 111111_2'
        }
    }).then(res=>{
        // var data = res.json();
        // console.log('RESPONSE: ', data);
        return res;
    }).then(data=>{
        console.log('this is data: ', data);
        res.json(data);
    })
}

export {
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory
}