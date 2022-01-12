const { AdminLoginController } = require("../Controllers/UserController");

const UserRoute = require("express").Router();
UserRoute.post("/login", AdminLoginController);



module.exports = UserRoute;