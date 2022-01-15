
const { compareCrypt } = require("../Modules/bcrypt");
const { createToken } = require("../Modules/jsonwebtoken");
const { AdminLoginValidation } = require("../Validations/AdminValidation");
const permissionChecker = require("../Helpers/PermissionChecker");
module.exports = class UserController {
    static async AdminLoginPostController(req, res, next) {
        try {

            const data = await AdminLoginValidation(req.body, res.error);
 
            const admin = await req.db.users.findOne({
                where: {
                    user_login: data.user_login,
                },
                raw: true,
            });
            console.log(admin);
            if(!admin) throw new res.error(404, "Login xato!");

            const isTrue = compareCrypt(
                data.user_password,
                admin.user_password,
            );

            if(!isTrue) throw new res.error("Parol xato!");

            await req.db.sessions.destroy({
                where: {
                    session_user_agent: req.headers["user-agent"] || "Unknown",
                    user_id: admin.user_id,
                }
            });

            const session = await req.db.sessions.create({
				session_user_agent: req.headers["user-agent"] || "Unknown",
				user_id: admin.user_id,
			});

            console.log("Session: " + session);

            const token = await createToken({
                session_id: session.dataValues.session_id,
            });

            console.log(token);

            res.status(201).json({
                ok: true,
                message: "Logged succesfully",
                data: {
                    token,
                }
            });

        } catch (error) {
            console.error("UserController Error:", error);
            next(error)
        }
    };
    static async userGetController(req, res, next) {
        try {
            let x =  permissionChecker("admin", req.user_permissions, res.error);
            console.log(x);
        } catch (error) {
            console.error("UserGetController:", error);
            next(error);
        }
    }
} 