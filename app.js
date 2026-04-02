const express = require("express");
const app = express();
const PORT = 3000
app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let tasks = [];
let currentId = 1;

const jwt = require("jsonwebtoken");

const SECRET = "supersecretkey";
let blacklist = [];

const USER = {
  username: "admin",
  password: "1234",
};

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Nicht authentifiziert" });
  }

  const token = authHeader.split(" ")[1];

  if (blacklist.includes(token)) {
    return res.status(401).json({ error: "Token ungültig" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token ungültig" });
  }
}

function validateTask(req, res, next) {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title darf nicht leer sein",
    });
  }

  next();
}

function createTask({ title, description, dueDate }) {
  return {
    id: String(currentId++),
    title,
    description: description || null,
    createdAt: new Date(),
    dueDate: dueDate ? new Date(dueDate) : null,
    completedAt: null,
  };
}

app.get("/tasks", authMiddleware, (req, res) => {
    res.json(tasks)
})

app.post("/tasks", authMiddleware, validateTask, (req, res) => {
  const task = createTask(req.body);

  tasks.push(task);

  res.status(201).json(task);
});

app.post("/tasks/:id/done", authMiddleware, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task nicht gefunden" });
  }

  task.completedAt = new Date();

  res.json(task);
});

app.get("/tasks/:id", authMiddleware, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task nicht gefunden" });
  }

  res.json(task);
});

app.put("/tasks/:id", authMiddleware, validateTask, (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task nicht gefunden" });
  }

  const updatedTask = {
    ...tasks[index],
    title: req.body.title,
    description: req.body.description || null,
    dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
  };

  tasks[index] = updatedTask;

  res.json(updatedTask);
});

app.delete("/tasks/:id", authMiddleware, (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task nicht gefunden" });
  }

  tasks.splice(index, 1);

  res.status(204).send();
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ error: "Ungültige Credentials" });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });

  res.json({ token });
});

app.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(" ")[1];

  if (blacklist.includes(token)) {
    return res.status(401).json({ valid: false });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ valid: true, user: decoded });
  } catch {
    res.status(401).json({ valid: false });
  }
});

app.delete("/logout", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ error: "Kein Token vorhanden" });
  }

  const token = authHeader.split(" ")[1];

  blacklist.push(token);

  res.json({ message: "Erfolgreich ausgeloggt" });
});

app.listen(PORT, () => {
    console.log(`App listening to port:`, (PORT));
})