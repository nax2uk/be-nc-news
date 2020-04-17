const routerApi = require("express").Router();
const {
  routerTopics,
  routerComments,
  routerUsers,
  routerArticles,
} = require("../router");

const { errStatus405, getApi } = require('../controller');

routerApi.route('/').get(getApi).all(errStatus405);
routerApi.use("/topics", routerTopics);
routerApi.use("/comments", routerComments);
routerApi.use("/articles", routerArticles);
routerApi.use("/users", routerUsers);

module.exports = routerApi;
