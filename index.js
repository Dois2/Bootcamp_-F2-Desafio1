const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

var requisicoes = 0;

// Global Middlewares
server.use((req, res, next) => {
  requisicoes++;
  console.log(`Esta é a ${requisicoes}º requisição nesta API!`);
  next();
});

// Middlewares
function verifyId(req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex(project => project.id === id);
  if (index !== -1) {
    req.index = id;
    next();
  } else return res.status(400).send({ Error: "Projeto não encontrado" });
}

// Routes

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

server.post("/projects/:id/tasks", verifyId, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const index = projects.findIndex(project => project.id === id);
  projects[index].tasks.push(title);
  return res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", verifyId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (projeto of projects) {
    if (projeto.id === id) {
      projeto.title = title;
    }
  }
  return res.send();
});

server.delete("/projects/:id", verifyId, (req, res) => {
  const { id } = req.params;

  var index = projects.findIndex(project => project.id === id);

  projects.splice(index, 1);

  return res.send();
});
server.listen(12346);
