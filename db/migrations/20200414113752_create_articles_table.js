exports.up = function (knex) {
  console.log("adding articles table ...");
  return knex.schema.createTable("articles", (tblArticles) => {
    tblArticles.increments("article_id").primary();
    tblArticles.text("title");
    tblArticles.text("body");
    tblArticles.integer("votes").defaultTo(0);
    tblArticles.string("topic").references("topics.slug");
    tblArticles.string("author").references("users.username");
    tbleArticles.timestamp("created_at");
  });
};

exports.down = function (knex) {
  console.log("removing articles table ...");
  return knex.schema.droptable("articles");
};
