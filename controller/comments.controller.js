const { updateComment } = require('../model');

const patchComment = (req, resp, next) => {
  updateComment(req.params.commentID, req.body)
    .then(objComment => {
      resp.status(200).send({ comment: objComment })
    })
    .catch(next);
}

module.exports = { patchComment };