const { compareCrypt, generateCrypt } = require("../Modules/bcrypt");
const { createToken } = require("../Modules/jsonwebtoken");
const { UserLoginValidation, UserCreateAccountValidation } = require("../Validations/UserValidation");

// const permissionChecker = require("../Helpers/PermissionChecker");

module.exports = class UserController {
    static async UserLoginPostController(req, res, next) {
        try {

            const data = await UserLoginValidation(req.body, res.error);

            const user = await req.db.users.findOne({
                where: {
                    user_email: data.user_email,
                },
                raw: true,
            });

            if(!user) throw new res.error(404, "Email xato!");

            const isTrue = compareCrypt(
                data.user_password,
                user.user_password,
            );

            if(!isTrue) throw new res.error("Parol xato!");

            await req.db.sessions.destroy({
                where: {
                    session_user_agent: req.headers["user-agent"] || "Unknown",
                    user_id: user.user_id,
                }
            });

            const session = await req.db.sessions.create({
				session_user_agent: req.headers["user-agent"] || "Unknown",
				user_id: user.user_id,
			});

            const token = await createToken({
                session_id: session.dataValues.session_id,
            });

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
    static async UserCreateAccountPostController(req, res, next) {
        try {
            const data = await UserCreateAccountValidation(req.body, res.error);
            console.log(req.db.users);
 
            const user = await req.db.users.create({
                ...data,
                user_password: generateCrypt(data.user_password),
            });
            console.log(user);
            const session = await req.db.session.create({
                session_user_agent: req.headers["user-agent"] || "Unknown",
                user_id: user.dataValues.user_id,
            });

            console.log("sessions " +  session);

            const token = createToken({
                session_id: session.dataValues.session_id,
                role: "user",
            });

            console.log("token" + token);

            await res.status(201).json({
                ok: true,
                message: "User muvaffaqiyatli qo'shildi!",
                data: {
                    token,
                },
            });

        } catch (error) {
            console.error("UserCreateAccountPostController error:", error);
            if (error.message.includes("Validation error")) {
				error.code = 400;
				error.message = "Bu email allaqachon mavjud";
			}
            next(error);
        }
    }
} 

