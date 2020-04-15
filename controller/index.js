const { errInvalidPaths, errTopicStatus405 } = require("./errors.controller");
const { getAllTopics } = require("./topics.controller");

module.exports = { errInvalidPaths, getAllTopics, errTopicStatus405 };
