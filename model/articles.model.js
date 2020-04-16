const connection = require('../db/connection')

const fetchArticle = (articleID) => {

  return connection('articles')
    .select('articles.*')
    .where('articles.article_id', parseInt(articleID))
    .count('comments.article_id as comment_count')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .then(result => {
      if (result.length === 0)
        return Promise.reject({ status: 404, msg: 'Resource Not Found: article_id does not exists.' })
      return result[0];
    })
}

const updateArticle = (articleID, { inc_votes, ...restOfObj }) => {

  if (inc_votes === undefined || Object.keys(restOfObj).length > 0) {
    return Promise.reject({ status: 400, msg: 'Bad Request: Invalid input data for updating votes.' })
  } else {
    const article_id = parseInt(articleID);
    return connection('articles')
      .select('*')
      .where('article_id', article_id)
      .then(arrResult => {
        if (arrResult.length === 0)
          return Promise.reject({ status: 404, msg: 'Resource Not Found: article_id does not exist.' })
        else {
          const newVotes = inc_votes + arrResult[0].votes;

          return connection('articles')
            .where({ article_id: article_id })
            .update({ votes: newVotes })
        }
      })
      .then(() => {
        return fetchArticle(articleID);
      })
      .then(objArticle => {
        return objArticle;
      })
  }
}

const insertComment = (articleID, objComment) => {
  const article_id = parseInt(articleID)

  return connection('comments')
    .insert({ author: objComment.username, article_id: article_id, body: objComment.body })
    .returning(['author', 'body', 'article_id', 'votes', 'created_at'])
    .then(arrResult => {
      return arrResult[0];
    })
}

const fetchComments = (articleID) => {
  return connection('comments')
    .select(['comment_id', 'votes', 'created_at', 'author', 'body'])
    .where('article_id', parseInt(articleID))
    .then(arrResult => {
      console.log(arrResult)
      return arrResult;
    })
}
module.exports = { fetchArticle, updateArticle, insertComment, fetchComments }