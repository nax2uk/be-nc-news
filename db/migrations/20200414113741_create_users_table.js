exports.up = function (knex) {
  //console.log("adding users table ...");
  return knex.schema.createTable("users", (tblUsers) => {
    tblUsers.string("username").primary().unique(); // unique?
    tblUsers.text("avatar_url");
    tblUsers.string("name").nullable();
  });
};

exports.down = function (knex) {
  //console.log("removing users table ...");
  return knex.schema.dropTable("users");
};
