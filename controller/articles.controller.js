const { fetchArticle } = require('../model')

const getArticle = (req, resp, next) => {
  console.log('in getArticle')
  fetchArticle(req.params.articleID).then(objArticle => {
    resp.status(200).send({ article: objArticle })
  }).catch(err => {
    console.log(err);
    next(err)
  })
}

module.exports = { getArticle };