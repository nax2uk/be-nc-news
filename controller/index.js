const {
  errInvalidPaths,
  errTopicStatus405,
  errUserStatus405,
  errArticleStatus405
} = require("./errors.controller");
const { getAllTopics } = require("./topics.controller");
const { getUser } = require("./users.controllers");
const { getArticle } = require('./articles.controller')

module.exports = {
  errInvalidPaths,
  errTopicStatus405,
  errUserStatus405,
  errArticleStatus405,
  getUser,
  getAllTopics,
  getArticle
};
