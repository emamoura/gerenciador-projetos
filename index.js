const express = require('express');
const app = express();

const projects = [];
app.use(express.json());

app.get('/projects', (request, response) => {
    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const {id, title} = request.body;
    const project = {id: id, title: title, tasks: []};
    projects.push(project);
    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title} = request.body;

    const project = projects.find(project => project.id == id);

    project.title = title;
 
    return response.json(project);
});

app.listen(3000, () => {
    console.log('Backend is running');
});