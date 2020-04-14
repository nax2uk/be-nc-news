const express = require("express");
const app = express();
const { routerApi } = require("./router");

app.use(express.json());
app.use("/api", routerApi);

module.exports = app;
