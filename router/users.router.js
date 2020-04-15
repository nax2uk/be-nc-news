const routerUsers = require("express").Router();
const { getUser, errUserStatus405 } = require("../controller");

routerUsers.route("/:userName").get(getUser).all(errUserStatus405);
module.exports = routerUsers;
