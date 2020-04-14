exports.up = function (knex) {
  console.log("adding comments table ...");
  return knex.schema.createTable("comments", (tblComments) => {
    tblComments.increments("comment_id").primary();
    tblComments.string("author").references("users.username");
    tblComments.integer("article_id").references("articles.article_id");
    tblComments.integer("votes").defaultTo(0);
    tblComments.timestamp("created_at").defaultTo(knex.fn.now());
    tblComments.text("body");
  });
};

exports.down = function (knex) {
  console.log("removing comments table ...");
  return knex.schema.dropTable("comments");
};
