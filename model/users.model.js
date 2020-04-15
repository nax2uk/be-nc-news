const connection = require("../db/connection");

const fetchUser = (userName) => {
  console.log("in fetchUser");
  return connection("users")
    .where("username", userName)
    .select("username", "avatar_url", "name")
    .then((result) => {
      return result[0];
    });
};

module.exports = { fetchUser };
