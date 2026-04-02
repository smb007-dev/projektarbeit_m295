function validateTask(req, res, next) {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title darf nicht leer sein" });
  }
  next();
}

module.exports = { validateTask };