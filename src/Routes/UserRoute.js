const { AdminLoginPostController, userGetController } = require("../Controllers/UserController");

const UserRoute = require("express").Router();

UserRoute.post("/login", AdminLoginPostController);
UserRoute.get("/", userGetController);


module.exports = UserRoute;