const { errInvalidPaths, errTopicStatus405 } = require("./errors.controller");
const { getAllTopics } = require("./topics.controller");
const { getUser } = require("./users.controllers");

module.exports = { errInvalidPaths, errTopicStatus405, getUser, getAllTopics };
