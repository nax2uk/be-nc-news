const handlePsqlErrors = (err, req, resp, next) => {
  if (err.code) {
    switch (err.code) {
      case '22P02':
      case '22003':
      case '42703':
        resp.status(400).send({ msg: 'Bad Request: Invalid input data.' });
        break;
      case "23503":
        resp.status(404).send({
          msg:
            "Resource not found: article_id does not exist.",
        });
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
