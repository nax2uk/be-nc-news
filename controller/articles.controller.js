const { fetchArticle, updateArticle } = require('../model')

const getArticle = (req, resp, next) => {
  console.log('in getArticle')
  fetchArticle(req.params.articleID).then(objArticle => {
    resp.status(200).send({ article: objArticle })
  }).catch(err => {
    console.log(err);
    next(err)
  })
}

const patchArticle = (req, resp, next) => {
  console.log('in patchArticle');
  updateArticle(req.params.articleID, req.body).then(objArticle => {
    resp.status(200).send({ article: objArticle })
  }).catch(err => {
    console.log(err);
    next(err);
  })
}

module.exports = { getArticle, patchArticle };