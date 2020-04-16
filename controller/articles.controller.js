const { fetchArticles, fetchArticleById, updateArticle, insertComment, fetchComments } = require('../model')

const getArticles = (req, resp, next) => {
  fetchArticles(req.query).then(arrObjArticles => {
    resp.status(200).send({ articles: arrObjArticles })
  }).catch(next);
}

const getArticleById = (req, resp, next) => {

  fetchArticleById(req.params.articleID).then(objArticle => {
    resp.status(200).send({ article: objArticle })
  }).catch(next)
}

const patchArticle = (req, resp, next) => {

  updateArticle(req.params.articleID, req.body).then(objArticle => {
    resp.status(200).send({ article: objArticle })
  }).catch(next)
}

const postComment = (req, resp, next) => {

  insertComment(req.params.articleID, req.body)
    .then(objComment => {
      resp.status(201).send({ comment: objComment })
    })
    .catch(next);

}

const getComments = (req, resp, next) => {

  fetchComments(req.params.articleID, req.query)
    .then(arrOfObjComments => {
      resp.status(200).send({ comments: arrOfObjComments });
    })
    .catch(next)
}
module.exports = { getArticles, getArticleById, patchArticle, postComment, getComments };