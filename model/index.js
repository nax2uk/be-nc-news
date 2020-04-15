const { fetchAllTopics } = require("./topics.model");
const { fetchUser } = require("./users.model");
const { fetchArticle } = require('./articles.model')
module.exports = { fetchAllTopics, fetchUser, fetchArticle };
