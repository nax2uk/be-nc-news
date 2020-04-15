
\c nc_news_test;

SELECT articles.*, COUNT(articles.article_id) as comment_count
FROM articles JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id;
