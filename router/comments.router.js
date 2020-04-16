const routerComments = require("express").Router();
const { patchComment, deleteComment, errStatus405 } = require('../controller')

routerComments
  .route('/:commentID')
  .patch(patchComment)
  .delete(deleteComment)
  .all(errStatus405)

module.exports = routerComments;
