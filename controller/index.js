const {
  errInvalidPaths,
  errStatus405
} = require("./errors.controller");

const { getApi } = require('./api.controller');
const { getAllTopics } = require("./topics.controller");
const { getUser } = require("./users.controllers");
const { getArticles, getArticleById, patchArticle, postComment, getComments } = require('./articles.controller');

const { patchComment, deleteComment } = require('./comments.controller');

module.exports = {
  errInvalidPaths,
  errStatus405,
  getApi,
  getUser,
  getAllTopics,
  getArticles,
  getArticleById,
  patchArticle,
  postComment,
  getComments,
  patchComment,
  deleteComment
};
