exports.up = function (knex) {

  return knex.schema.createTable("users", (tblUsers) => {
    tblUsers.string("username").primary().unique();
    tblUsers.text("avatar_url");
    tblUsers.string("name").notNullable();
  });
};

exports.down = function (knex) {

  return knex.schema.dropTable("users");
};
