const express = require('express');
const app = express();

const projects = [];


function checkIfProjectExist(request, response, next) {
    const { id } = request.params;
    const project = projects.find((project => project.id === id));

    if (!project) {
        return response.status(400).json({ error: 'Project not found' })
    }

    return next();
}

function logRequests(request, response, next) {
    console.count("Request number");

    return next();
}

app.use(logRequests);
app.use(express.json());

app.get('/projects', (request, response) => {
    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const { id, title } = request.body;
    const project = { id: String(id), title: String(title), tasks: [] };
    projects.push(project);
    return response.json(project);
});

app.post('/projects/:id/tasks', checkIfProjectExist, (request, response) => {
    const { id } = request.params;
    const { title } = request.body;

    const project = projects.find(project => project.id === id);

    project.tasks.push(title);

    return res.json(project);
});

app.put('/projects/:id', checkIfProjectExist, (request, response) => {
    const { id } = request.params;
    const { title } = request.body;

    const project = projects.find(project => project.id == id);

    project.title = title;

    return response.json(project);
});

app.delete('/projects/:id', checkIfProjectExist, (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    projects.splice(projectIndex, 1);

    return response.send('Sucess');

});

app.listen(3000, () => {
    console.log('Backend is running');
});