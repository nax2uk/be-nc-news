const routerTopics = require("express").Router();
const { getAllTopics } = require("../controller");

routerTopics.route("/").get(getAllTopics);

module.exports = routerTopics;
