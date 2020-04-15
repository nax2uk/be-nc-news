const routerTopics = require("express").Router();
const { getAllTopics } = require("../controller");
const { errTopicStatus405 } = require("../controller");

routerTopics.route("/").get(getAllTopics).all(errTopicStatus405);

module.exports = routerTopics;
