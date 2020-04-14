const errInvalidPaths = (req, resp) => {
  resp
    .status(404)
    .send({ msg: "Invalid URL: Your specified path does not exist." });
};

module.exports = { errInvalidPaths };
