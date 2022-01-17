const { UserLoginPostController, UserCreateAccountController } = require("../Controllers/UserController");

const UserRoute = require("express").Router();

UserRoute.post("/login", UserLoginPostController);
UserRoute.get("/", UserCreateAccountController);


module.exports = UserRoute;