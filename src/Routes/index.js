
const Router = require("express").Router();
const UserRoute = require("./UserRoute");



Router.use("/users", UserRoute);

module.exports = Router;