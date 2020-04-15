
\c nc_news_test;

SELECT articles.article_id, articles.title, articles.topic, COUNT(comments.article_id) as comment_count
FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
GROUP BY articles.article_id;

SELECT * FROM comments WHERE article_id = 4;
SELECT body FROM articles WHERE article_id = 4;
