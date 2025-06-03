const express = require("express");
const todoRouter = require("./router/todoRouter");

const app = express();
app.use(express.json());
app.use("/todos", todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

module.exports = app;