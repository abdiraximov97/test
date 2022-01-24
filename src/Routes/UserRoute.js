const {
  UserLoginPostController,
  UserCreateAccountPostController,
  UserRecoveryPasswordSubmitPostController,
  UserRecoveryPasswordCheckGetController,
} = require("../Controllers/UserController");

const UserRoute = require("express").Router();

UserRoute.post("/login", UserLoginPostController);
UserRoute.post("/account", UserCreateAccountPostController);
UserRoute.post("/password", UserRecoveryPasswordSubmitPostController);
UserRoute.get("/password/:attempt_id", UserRecoveryPasswordCheckGetController)

module.exports = UserRoute;
