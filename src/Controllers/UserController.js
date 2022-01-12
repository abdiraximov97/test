
const { generateCrypt } = require("../Modules/bcrypt");
const { compareCrypt } = require("../Modules/bcrypt");
const { createToken } = require("../Modules/jsonwebtoken");
const { AdminLoginValidation } = require("../Validations/AdminValidation");

module.exports = class UserController {
    static async AdminLoginValidation(req, res, next) {
        try {
            const data = await AdminLoginValidation(req.body, res.error);
            
            const admin = req.db.users.findOne({
                where: {
                    user_login: data.user_login,
                },
                raw: true,
            });

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

            const token = await createToken({
                session_id: sessions.dataValues.session_id,
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
    }
} 