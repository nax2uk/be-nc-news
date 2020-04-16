const connection = require('../db/connection');

const updateComment = (commentID, { inc_votes }) => {
  return connection('comments')
    .increment('votes', inc_votes)
    .where('comment_id', parseInt(commentID))
    .returning('*')
    .then(arrResult => {
      return arrResult[0];
    })
}

module.exports = { updateComment };