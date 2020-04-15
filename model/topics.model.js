const connection = require("../db/connection");

const fetchAllTopics = () => {

  return connection("topics").select("*");
};

module.exports = { fetchAllTopics };
