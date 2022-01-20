const {
  UserLoginPostController,
  UserCreateAccountPostController,
} = require("../Controllers/UserController");

const UserRoute = require("express").Router();

UserRoute.post("/login", UserLoginPostController);
UserRoute.post("/account", UserCreateAccountPostController);

module.exports = UserRoute;
