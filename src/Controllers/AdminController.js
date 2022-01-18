const { CreateBanValidation } = require("../Validations/BanValidation");

module.exports = class AdminController {
  static async CreateBanController(req, res, next) {
    try {
      const data = await CreateBanValidation(req.body, res.error);

      const user = await req.db.users.findOne({
        where: {
          user_id: data.user_id,
        },
      });

      if (!user) throw new res.error(404, "User topilmadi!");

      if (user.role == "admin")
        throw new res.error(404, "Siz adminga ta'qiq qo'yolmaysiz");

      const ban = await req.db.user_bans.create({
        user_id: data.user_id,
        ban_reason: data.ban_reason,
        ban_expire_date: data.ban_expire_date,
      });

      res.status(201).json({
        ok: true,
        message: "Ta'qiq qo'yildi",
        data: {
          ban,
        },
      });
    } catch (error) {
      console.error("AdminController error: ", error);
      next(error);
    }
  }

  static async DeleteBanController(req, res, next) {
    try {
      const ban_id = req.params.ban_id;

      const ban = await req.db.users_bans.destroy({
        where: {
          ban_id: ban_id,
        },
      });

      res.status(200).json({
        ok: true,
        message: "Ta'qiq olib tashlandi",
      });
    } catch (error) {
      console.error("DeleteBanController error: ", error);
    };
  };

  
};
