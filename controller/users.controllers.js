const { fetchUser } = require("../model");
const getUser = (req, resp, next) => {
  fetchUser(req.params.userName)
  .then((objUser) => {
    resp.status(200).send({ user: objUser });
  })
  .catch(err=>{
    console.log(err);
    next(err);
  })
};

module.exports = { getUser };
