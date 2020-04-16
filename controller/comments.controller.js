const { updateComment, removeComment } = require('../model');

const patchComment = (req, resp, next) => {
  updateComment(req.params.commentID, req.body)
    .then(objComment => {
      resp.status(200).send({ comment: objComment })
    })
    .catch(next);
}

const deleteComment = (req, resp, next) => {
  console.log('in deleteComment');
  removeComment(req.params.commentID).then(() => {
    resp.status(204).send({});
  }).catch(err => {
    console.log(err);
    next(err);
  });
}
module.exports = { patchComment, deleteComment };