const { fetchArticle, updateArticle, insertComment, fetchComments } = require('../model')

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
    .catch(next);

}

const getComments = (req, resp, next) => {
  console.log(req.query)
  fetchComments(req.params.articleID, req.query)
    .then(arrOfObjComments => {
      console.log(arrOfObjComments);
      resp.status(200).send({ comments: arrOfObjComments });
    })
    .catch(err => {
      console.log(err);
      next(err)
    });
}
module.exports = { getArticle, patchArticle, postComment, getComments };