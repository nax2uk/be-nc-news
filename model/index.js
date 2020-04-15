const { fetchAllTopics } = require("./topics.model");
const { fetchUser } = require("./users.model");
const { fetchArticle, updateArticle, insertComment } = require('./articles.model')

module.exports = { fetchAllTopics, fetchUser, fetchArticle, updateArticle, insertComment };
