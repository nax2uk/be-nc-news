const { updateComment, removeComment } = require('../model');

const patchComment = (req, resp, next) => {
  updateComment(req.params.commentID, req.body)
    .then(objComment => {
      resp.status(200).send({ comment: objComment })
    })
    .catch(next);
}

const deleteComment = (req, resp, next) => {

  removeComment(req.params.commentID).then(() => {
    resp.status(204).send({});
  }).catch(next);
}
module.exports = { patchComment, deleteComment };