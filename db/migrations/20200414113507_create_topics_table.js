exports.up = function (knex) {
  console.log("creating topics table ...");
  return knex.schema.createTable("topics", (tblTopics) => {
    tblTopics.string("slug").primary().unique(); // unique?
    tblTopics.text("description").nullable();
  });
};

exports.down = function (knex) {
  console.log("removing topics table ...");
  return knex.schema.dropTable("topics");
};
