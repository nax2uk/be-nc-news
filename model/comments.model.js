const connection = require('../db/connection');

const updateComment = (commentID, { inc_votes, ...restOfObj }) => {
  if (inc_votes === undefined || Object.keys(restOfObj).length > 0) {
    return Promise.reject({ status: 400, msg: 'Bad Request: Invalid input data.' })
  } else {
    return connection('comments')
      .increment('votes', inc_votes)
      .where('comment_id', parseInt(commentID))
      .returning('*')
      .then(arrResult => {
        if (arrResult.length === 0)
          return Promise.reject({ status: 404, msg: 'Resource Not Found: comment_id does not exist.' })
        return arrResult[0];
      })
  }
}

const removeComment = (commentID) => {
  return connection('comments')
    .del()
    .where('comment_id', parseInt(commentID))
    .returning('*')
    .then(arrResult => {
      if (arrResult.length === 0)
        return Promise.reject({ status: 404, msg: 'Resource Not Found: comment_id does not exist.' })

    })
}
module.exports = { updateComment, removeComment };