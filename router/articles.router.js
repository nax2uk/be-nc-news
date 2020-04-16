const routerArticles = require("express").Router();
const { getArticle, patchArticle, postComment, getComments, errArticleStatus405 } = require('../controller');


routerArticles
  .route('/:articleID')
  .get(getArticle)
  .patch(patchArticle)
  .all(errArticleStatus405);

routerArticles
  .route('/:articleID/comments')
  .post(postComment)
  .get(getComments)

module.exports = routerArticles;
