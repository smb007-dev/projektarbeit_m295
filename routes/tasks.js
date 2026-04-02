const express = require("express");
const router = express.Router();
const { tasks, createTask } = require("../models/taskModel");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validateTask } = require("../middleware/validateTask");

// GET /tasks
router.get("/", authMiddleware, (req, res) => {
  res.json(tasks);
});

// POST /tasks
router.post("/", authMiddleware, validateTask, (req, res) => {
  const task = createTask(req.body);
  tasks.push(task);
  res.status(201).json(task);
});

// POST /tasks/:id/done
router.post("/:id/done", authMiddleware, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task nicht gefunden" });

  task.completedAt = new Date();
  res.json(task);
});

// GET /tasks/:id
router.get("/:id", authMiddleware, (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task nicht gefunden" });

  res.json(task);
});

// PUT /tasks/:id
router.put("/:id", authMiddleware, validateTask, (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task nicht gefunden" });

  tasks[index] = {
    ...tasks[index],
    title: req.body.title,
    description: req.body.description || null,
    dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
  };
  res.json(tasks[index]);
});

// DELETE /tasks/:id
router.delete("/:id", authMiddleware, (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task nicht gefunden" });

  tasks.splice(index, 1);
  res.status(204).send();
});

module.exports = router;