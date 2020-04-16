const routerComments = require("express").Router();
const { patchComment, errStatus405 } = require('../controller')

routerComments
  .route('/:commentID')
  .patch(patchComment)
  .all(errStatus405)

module.exports = routerComments;
