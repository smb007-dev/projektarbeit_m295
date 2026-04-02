let tasks = [];

function createTask({ title, description, dueDate }) {
  return {
    id: String(tasks.length + 1),
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