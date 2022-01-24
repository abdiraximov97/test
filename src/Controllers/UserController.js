const { compareCrypt, generateCrypt } = require("../Modules/bcrypt");
const { createToken } = require("../Modules/jsonwebtoken");
const {
  UserLoginValidation,
  UserCreateAccountValidation,
  UserForgatPasswordValidation,
} = require("../Validations/UserValidation");
const email = require("../Modules/email");
const generator = require("generate-password");

// const permissionChecker = require("../Helpers/PermissionChecker");

module.exports = class UserController {
// ro'yxatdan o'tgan foydalanuvchi saytda email va parol orqali kirishi

  static async UserLoginPostController(req, res, next) {
    try {
      const data = await UserLoginValidation(req.body, res.error);

      const user = await req.db.users.findOne({
        where: {
          user_email: data.user_email,
        },
        raw: true,
      });

      if (!user) throw new res.error(404, "Email xato!");

      const isTrue = compareCrypt(data.user_password, user.user_password);

      if (!isTrue) throw new res.error("Parol xato!");

      await req.db.sessions.destroy({
        where: {
          session_user_agent: req.headers["user-agent"] || "Unknown",
          user_id: user.user_id,
        },
      });

      const session = await req.db.sessions.create({
        session_user_agent: req.headers["user-agent"] || "Unknown",
        user_id: user.user_id,
      });

      const token = await createToken({
        session_id: session.dataValues.session_id,
        user_role: user.user_role || "user",
      });

      const attempt = await req.db.attempts.destroy({
        where: {
          user_id: user.user_id,
        },
      });

      console.log("Attempt: ", attempt);

      res.status(201).json({
        ok: true,
        message: "Logged succesfully",
        data: {
          token,
        },
      });
    } catch (error) {
      console.error("UserController Error:", error);
      next(error);
    }
  }

// foydalanuvchi saytdan ro'yxatdan o'tishi

  static async UserCreateAccountPostController(req, res, next) {
    try {
      const data = await UserCreateAccountValidation(req.body, res.error);

      const user = await req.db.users.create({
        ...data,
        user_password: generateCrypt(data.user_password),
      });

      const session = await req.db.sessions.create({
        session_user_agent: req.headers["user-agent"] || "Unknown",
        user_id: user.dataValues.user_id,
      });

      const token = await createToken({
        session_id: session.dataValues.session_id,
        role: "user",
      });

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

// foydalanuvchi parolini email orqali qayta tiklash  

  static async UserRecoveryPasswordSubmitPostController(req, res, next) {
    try {
      const data = await UserForgatPasswordValidation(req.body, res.error);

      const user = await req.db.users.findOne({
          where: {
              user_email: data.user_email,
          },
      });

      if(!user) throw new res.error(404, "Email xato!");

      const count = await req.db.attempts.count({
          where: {
              user_id: data.dataValues.user_id,
          },
      });

      if(count > 5) {
          throw new res.error(430, "Ammallar soni ko'payib ketti!")
      }

      const attempt = await req.db.attempts.create({
          user_id: data.dataValues.user_id,
      });

      await email(
        user.dataValues.user_email,
        `<a href="localhost:${process.env.port}/v1/users/password/${attempt.dataValues.attempt_id}"> Parolni qayta tiklash uchun bosing</a>`
      );

      res.status(201).json({
          ok: true,
          message: "Tasdiqlash xabari yuborildi. Elektron pochtangizni tekshiring.",
      });

    } catch (error) {
      console.log("UserRecoveryPasswordSubmitPostController Error: ", error);
      next(error);
    }
  }

//   foydalanuvchi qayta tiklagan parolini tekshirish 
  static async UserRecoveryPasswordCheckGetController(req, res, next) {
      try {
          const { attempt_id } = req.pamas;

          if(!attempt_id) throw new res.error(404, "Bu sahifa yo'q"); 

          const attempt = await req.db.attempts.findOne({
              where: {
                  attempt_id,
              },
              include: req.db.users,
          });

          if(!attempt) throw new res.error(404, "Bu sahifa yo'q");

          await req.db.attempts.destroy({
              where: {
                  user_id: attempt.dataValues.user_id,
              },
          });

          const new_password = generator.generate({
              length: 8,
          });

          await req.db.users.update(
              {
                  user_password: generateCrypt(new_password),
              },
              {
                where: {
                    user_id: attempt.dataValues.user_id,
                },
              },
          );

          await email(
              attempt.dataValues.user.dataValues.user_email,
              `Sizning yangi parolingiz: ${new_password}. Iltimos yangilang`,
          );

          res.json({
              ok: true,
              message: "Yangi parol pochtangizga yuborildi.!",
          })

      } catch (error) {
          console.log("UserRecoveryPasswordCheckGetController Error: ", error);
          next(error);
      }
  }
};
