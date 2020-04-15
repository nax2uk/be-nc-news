const { fetchAllTopics } = require("../model/");
const getAllTopics = (req, resp, next) => {
  console.log("in getAllTopics");
  fetchAllTopics().then((arrObjTopics) => {
    resp.status(200).send({ topics: arrObjTopics });
  });
};

module.exports = { getAllTopics };
