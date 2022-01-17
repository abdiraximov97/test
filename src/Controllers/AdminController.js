const { UserLoginValidation } = require("../Validations/UserValidation");

module.exports = class AdminController {
    static async CreateBanController(req, res, next) {
        const data = await UserLoginValidation(req.body, res.error);
    };
};