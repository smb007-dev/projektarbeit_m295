let tasks = [];
let currentId = 1;

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

module.exports = {
  tasks,
  createTask,
};