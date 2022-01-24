const {HomeGetController} = require("../Controllers/HomeController");

const AuthMiddleware = require("../Middlewares/AuthMiddleware");

const HomeRoute =   require("express").Router();

HomeRoute.use(AuthMiddleware);

HomeRoute.get("/", HomeGetController);
module.exports = HomeRoute;