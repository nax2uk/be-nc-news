const routerApi = require("express").Router();
const {
  routerTopics,
  routerComments,
  routerUsers,
  routerArticles,
} = require("../router");

routerApi.use("/topics", routerTopics);
routerApi.use("/comments", routerComments);
routerApi.use("/articles", routerArticles);
routerApi.use("/users", routerUsers);

module.exports = routerApi;
