const express = require("express");
const app = express();
const { routerApi } = require("./router");
const { errInvalidPaths } = require("./controller");

app.use(express.json());
app.use("/api", routerApi);

//error-controller for invalid paths
app.all("/*", errInvalidPaths);

module.exports = app;
