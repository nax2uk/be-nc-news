const { fetchArticle, updateArticle, insertComment } = require('../model')

const getArticle = (req, resp, next) => {

  fetchArticle(req.params.articleID).then(objArticle => {
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
    .catch(err => {
      console.log(err);
      next(err)
    })

}
module.exports = { getArticle, patchArticle, postComment };