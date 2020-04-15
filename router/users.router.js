const routerUsers = require("express").Router();
const { getUser } = require("../controller");

routerUsers.route("/:userName").get(getUser);
module.exports = routerUsers;
