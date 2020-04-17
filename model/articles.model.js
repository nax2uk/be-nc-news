const connection = require('../db/connection')

const fetchArticles = ({ sort_by, order, author, topic }) => {

  if (order && !(order === 'asc' || order === 'desc')) {
    return Promise.reject({ status: 400, msg: 'Bad Request: Invalid input data.' })
  } else {
    return connection('articles')
      .select('articles.article_id', 'articles.author', 'articles.created_at', 'title', 'topic', 'articles.votes')
      .count('comments.article_id as comment_count')
      .leftJoin('comments', 'comments.article_id', 'articles.article_id')
      .groupBy('articles.article_id')
      .orderBy(sort_by || 'created_at', order || 'desc')
      .modify(authorQuery => {
        if (author) authorQuery.where('articles.author', author);
      })
      .modify(topicQuery => {
        if (topic) topicQuery.where({ topic });
      })
      .then(result => {
        if (result.length == 0) {
          return Promise.reject({ status: 404, msg: 'Resource not found: cannot display results for query' })
        }
        return result;
      })
  }
}

const fetchArticleById = (articleID) => {

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
    return Promise.reject({ status: 400, msg: 'Bad Request: Invalid input data.' })
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
        return fetchArticleById(articleID);
      })
      .then(objArticle => {
        return objArticle;
      })
  }
}

const insertComment = (articleID, { username, body, ...restOfObj }) => {
  const article_id = parseInt(articleID)

  if (username === undefined || body === undefined || Object.keys(restOfObj).length > 0) {
    return Promise.reject({ status: 400, msg: "Bad Request: Invalid input data." })
  } else {
    return connection('comments')
      .insert({ author: username, article_id: article_id, body: body })
      .returning(['author', 'body', 'comment_id', 'votes', 'created_at'])
      .then(arrResult => {
        return arrResult[0];
      })
  }
}

const fetchComments = (articleID, { sort_by, order }) => {
  if (order && !(order === 'asc' || order === 'desc')) {
    return Promise.reject({ status: 400, msg: 'Bad Request: Invalid input data.' })
  } else {
    return connection('comments')
      .orderBy([{ column: sort_by || 'created_at', order: order || 'desc' }])
      .select(['comment_id', 'votes', 'created_at', 'author', 'body'])
      .where('article_id', articleID)

      .then(arrResult => {
        if (arrResult.length === 0) {
          return Promise.reject({ status: 404, msg: "Resource Not Found: article_id does not exist." })
        }
        return arrResult;
      })
  }
}
module.exports = { fetchArticles, fetchArticleById, updateArticle, insertComment, fetchComments }