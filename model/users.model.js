const connection = require("../db/connection");

const fetchUser = (userName) => {

  return connection("users")
    .where("username", userName)
    .select("username", "avatar_url", "name")
    .then((result) => {
      if (result.length === 0)
        return Promise.reject({ status: 404, msg: 'Resource Not Found: Username does not exist' });
      return result[0];
    });
};

module.exports = { fetchUser };
