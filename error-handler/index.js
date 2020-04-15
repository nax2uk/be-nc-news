const handlePsqlErrors = (err, req, resp, next) => {
  if (err.code) {
    switch (err.code) {
      case '22P02':
        resp.status(400).send({ msg: 'Bad Request: Invalid input type for article data' })
        break;
      default:
    }
  } else next(err);
};
const handleCustomErrors = (err, req, resp, next) => {
  if (err.status) resp.status(err.status).send({ msg: err.msg });
  else next(err);
};
const handleServerErrors = (err, req, resp, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = { handlePsqlErrors, handleCustomErrors, handleServerErrors };
