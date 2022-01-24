const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const AdminMiddleware = require("../Middlewares/AuthMiddleware");
const {CreateBanController, DeleteBanController, GetAllUsersController} = require("../Controllers/AdminController");

const AdminRouter = require("express").Router();

AdminRouter.use([AuthMiddleware, AdminMiddleware]);
AdminRouter.post("/bans", CreateBanController);
AdminRouter.post("bans/:bans_id", DeleteBanController);
AdminRouter.get("users", GetAllUsersController);

module.exports = AdminRouter;
