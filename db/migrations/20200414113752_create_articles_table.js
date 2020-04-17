exports.up = function (knex) {

  return knex.schema.createTable("articles", (tblArticles) => {
    tblArticles.increments("article_id");
    tblArticles.text("title").notNullable();
    tblArticles.text("body").notNullable();
    tblArticles.integer("votes").defaultTo(0);
    tblArticles.string("topic").references("topics.slug");
    tblArticles.string("author").references("users.username");
    tblArticles.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {

  return knex.schema.dropTable("articles");
};
