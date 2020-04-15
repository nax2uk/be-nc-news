const { fetchAllTopics } = require("./topics.model");
const { fetchUser } = require("./users.model");
const { fetchArticle, updateArticle } = require('./articles.model')
module.exports = { fetchAllTopics, fetchUser, fetchArticle, updateArticle };
