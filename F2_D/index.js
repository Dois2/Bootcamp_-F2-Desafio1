const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.post('/projects', (req,res) =>{
    const {id, title} = req.body;

    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project);

    return res.json(projects);


})

server.get('/projects', (req,res) => {
    return res.json(projects);
})

server.put('/projects/:id',(req,res)=> {
    const {id} = req.params;
    const {title} = req.body;

    for(projeto of projects){
        if(projeto.id === id){
            projeto.title = title;
        }
    }
    return res.send();
})

server.delete('/projects/:id', (req,res)=>{
    
})



server.listen(12345);
