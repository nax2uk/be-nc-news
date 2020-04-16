const errInvalidPaths = (req, resp) => {
  resp
    .status(404)
    .send({ msg: "Invalid URL: Your specified path does not exist." });
};

const errStatus405 = (req, resp) => {
  resp.status(405).send({ msg: `Method Not Allowed: for HTTP ${req.method} at ${req.originalUrl}` })
}

module.exports = { errInvalidPaths, errStatus405 };
