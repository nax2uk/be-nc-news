const { fetchAllTopics } = require("./topics.model");
const { fetchUser } = require("./users.model");
const { fetchArticles, fetchArticleById, updateArticle, insertComment, fetchComments } = require('./articles.model')

module.exports = { fetchAllTopics, fetchUser, fetchArticles, fetchArticleById, updateArticle, insertComment, fetchComments };
