const express = require("express");
const app = express();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/tasks", taskRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));