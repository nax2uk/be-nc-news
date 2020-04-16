const { fetchAllTopics } = require("./topics.model");
const { fetchUser } = require("./users.model");
const { fetchArticles, fetchArticleById, updateArticle, insertComment, fetchComments } = require('./articles.model')
const { updateComment, removeComment } = require('./comments.model')

module.exports = { fetchAllTopics, fetchUser, fetchArticles, fetchArticleById, updateArticle, insertComment, fetchComments, updateComment, removeComment };
