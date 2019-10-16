const express = require('express');

const server = express();
server.use(express.json());
const user = [ 'Lucas', 'Claudio', 'Vitor']

server.get('/users' ,(req, res) => {
    return res.json(user)
})

server.get('/users/:index', (req,res )=> {
    const {index} = req.params;

    return res.json(user[index]);
})

server.post('/users', (req, res) => {
    const {name} = req.body;

    user.push(name);
    return res.json(user);
})

server.put('/users/:index', (req,res)=>{
    const {name} = req.body;
    const {index} = req.params;

    user[index] = name;
    
    return res.json(user);


})

server.delete('/users/:index', (req,res) => {
    const {index} = req.params;

    user.splice(index, 1 );
    return res.send();
})


server.listen(12345);