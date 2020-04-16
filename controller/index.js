const {
  errInvalidPaths,
  errStatus405
} = require("./errors.controller");

const { getAllTopics } = require("./topics.controller");
const { getUser } = require("./users.controllers");
const { getArticles, getArticleById, patchArticle, postComment, getComments } = require('./articles.controller')

const { patchComment } = require('./comments.controller')

module.exports = {
  errInvalidPaths,
  errStatus405,
  getUser,
  getAllTopics,
  getArticles,
  getArticleById,
  patchArticle,
  postComment,
  getComments,
  patchComment
};
