exports.up = function (knex) {

  return knex.schema.createTable("topics", (tblTopics) => {
    tblTopics.string("slug").primary();
    tblTopics.text("description").notNullable();
  });
};

exports.down = function (knex) {

  return knex.schema.dropTable("topics");
};
