const { fetchUser } = require("../model");
const getUser = (req, resp, next) => {
  console.log(req.params.userName);
  fetchUser(req.params.userName).then((objUser) => {
    resp.status(200).send({ user: objUser });
  });
};

module.exports = { getUser };
