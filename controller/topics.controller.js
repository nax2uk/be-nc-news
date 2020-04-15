const { fetchAllTopics } = require("../model/");

const getAllTopics = (req, resp, next) => {

  fetchAllTopics()
    .then((arrObjTopics) => {
      resp.status(200).send({ topics: arrObjTopics });
    })
    .catch(next);
};

module.exports = { getAllTopics };
