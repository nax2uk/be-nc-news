const routerUsers = require("express").Router();
const { getUser, errStatus405 } = require("../controller");

routerUsers.route("/:userName").get(getUser).all(errStatus405);
module.exports = routerUsers;
