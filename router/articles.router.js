const routerArticles = require("express").Router();
const { getArticle } = require('../controller');

routerArticles.route('/:articleID').get(getArticle);

module.exports = routerArticles;
