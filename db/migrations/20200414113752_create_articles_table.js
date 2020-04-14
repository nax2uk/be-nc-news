exports.up = function (knex) {
  console.log("adding articles table ...");
  return knex.schema.createTable("articles", (tblArticles) => {
    tblArticles.increments("article_id");
    tblArticles.text("title").nullable();
    tblArticles.text("body").nullable();
    tblArticles.integer("votes").defaultTo(0);
    tblArticles.string("topic").references("topics.slug");
    tblArticles.string("author").references("users.username");
    tblArticles.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  console.log("removing articles table ...");
  return knex.schema.dropTable("articles");
};
