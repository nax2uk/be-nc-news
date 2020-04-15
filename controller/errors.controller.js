const errInvalidPaths = (req, resp) => {
  resp
    .status(404)
    .send({ msg: "Invalid URL: Your specified path does not exist." });
};

const errTopicStatus405 = (req, resp) => {
  resp
    .status(405)
    .send({
      msg:
        "Method Not Allowed: for HTTP POST, PUT, PATCH and DELETE /api/topics",
    });
};

module.exports = { errInvalidPaths, errTopicStatus405 };
