const connection = require("../db/connection");

const fetchAllTopics = () => {
  console.log("in fetchAllTopics");
  return connection("topics").select("*");
};

module.exports = { fetchAllTopics };
