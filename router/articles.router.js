const routerArticles = require("express").Router();
const { getArticle, patchArticle, errArticleStatus405 } = require('../controller');


routerArticles.route('/:articleID').get(getArticle).patch(patchArticle).all(errArticleStatus405)

module.exports = routerArticles;
