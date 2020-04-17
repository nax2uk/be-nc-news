exports.up = function (knex) {

  return knex.schema.createTable("comments", (tblComments) => {
    tblComments.increments("comment_id").primary();
    tblComments.string("author").references("users.username").notNullable();
    tblComments.integer("article_id").references("articles.article_id");
    tblComments.integer("votes").defaultTo(0);
    tblComments.timestamp("created_at").defaultTo(knex.fn.now());
    tblComments.text("body").notNullable();
  });
};

exports.down = function (knex) {

  return knex.schema.dropTable("comments");
};
