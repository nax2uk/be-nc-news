const routerTopics = require("express").Router();
const { getAllTopics, errStatus405 } = require("../controller");

routerTopics.route("/").get(getAllTopics).all(errStatus405);

module.exports = routerTopics;
