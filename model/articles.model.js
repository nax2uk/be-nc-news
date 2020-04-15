const connection = require('../db/connection')
/* SELECT articles.*, COUNT(articles.article_id) as comment_count
FROM articles JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id;*/
const fetchArticle = (articleID) => {

  console.log('in fetchArticle')
  console.log(articleID);
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

const updateArticle = (articleID, { inc_votes }) => {
  const article_id = parseInt(articleID);
  return connection('articles')
    .select('*')
    .where('article_id', article_id)
    .then(arrResult => {
      if (arrResult.length === 0)
        return Promise.reject({ status: 404, msg: 'Resource Not Found: article_id does not exist.' })
      else {
        const newVotes = inc_votes + arrResult[0].votes;
        console.log(newVotes);
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

module.exports = { fetchArticle, updateArticle }