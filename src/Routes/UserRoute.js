const { AdminLoginPostController } = require("../Controllers/UserController");

const UserRoute = require("express").Router();
UserRoute.post("/login", AdminLoginPostController);



module.exports = UserRoute;