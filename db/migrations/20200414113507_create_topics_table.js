exports.up = function (knex) {
  console.log("creating topics table ...");
  return knex.schema.creatTable("topics", (tblTopics) => {
    tblTopics.string("slug").primary();
    tblTopics.text("description");
  });
};

exports.down = function (knex) {
  console.log("removing topics table ...");
  return knex.schema.dropTable("topics");
};
