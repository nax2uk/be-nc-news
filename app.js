const express = require("express");
const app = express();
const { routerApi } = require("./router");
const { errInvalidPaths } = require("./controller");

const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./error-handler");

const cors = require('cors');

app.use(cors())

app.use(express.json());
app.use("/api", routerApi);

//error-controller for invalid paths
app.all("/*", errInvalidPaths);

// error-handling middleware
app.use(handlePsqlErrors);
app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
