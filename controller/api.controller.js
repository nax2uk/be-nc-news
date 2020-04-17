const { fetchApi } = require('../model');

exports.getApi = (req, resp, next) => {
  console.log('in getApi');
  fetchApi()
    .then(objApi => {
      resp.status(200).send({ api: JSON.parse(objApi) })
    })
    .catch(next);
}