const routerArticles = require("express").Router();
const { getArticles, getArticleById, patchArticle, postComment, getComments, errStatus405 } = require('../controller');

routerArticles
  .route('/')
  .get(getArticles)
  .all(errStatus405)
routerArticles
  .route('/:articleID')
  .get(getArticleById)
  .patch(patchArticle)
  .all(errStatus405);

routerArticles
  .route('/:articleID/comments')
  .post(postComment)
  .get(getComments)
  .all(errStatus405)

module.exports = routerArticles;
