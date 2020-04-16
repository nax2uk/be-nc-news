const routerArticles = require("express").Router();
const { getArticle, patchArticle, postComment, getComments, errStatus405 } = require('../controller');


routerArticles
  .route('/:articleID')
  .get(getArticle)
  .patch(patchArticle)
  .all(errStatus405);

routerArticles
  .route('/:articleID/comments')
  .post(postComment)
  .get(getComments)
  .all(errStatus405)

module.exports = routerArticles;
