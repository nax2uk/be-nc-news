const {
  errInvalidPaths,
  errStatus405
} = require("./errors.controller");
const { getAllTopics } = require("./topics.controller");
const { getUser } = require("./users.controllers");
const { getArticle, patchArticle, postComment, getComments } = require('./articles.controller')

module.exports = {
  errInvalidPaths,
  errStatus405,
  getUser,
  getAllTopics,
  getArticle,
  patchArticle,
  postComment,
  getComments
};
