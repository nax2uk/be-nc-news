const routerArticles = require("express").Router();
const { getArticle, errArticleStatus405 } = require('../controller');


routerArticles.route('/:articleID').get(getArticle).all(errArticleStatus405)

module.exports = routerArticles;
