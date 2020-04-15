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
      if (result.length===0)
        return Promise.reject({ status: 404, msg: 'Resource Not Found: article_id does not exists.'})
      return result[0];
    })
}

module.exports = { fetchArticle }