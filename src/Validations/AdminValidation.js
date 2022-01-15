const Joi = require("joi");

module.exports = class AdminValidations {
  static async AdminLoginValidation(data, CustomError) {
    return await Joi.object({
      user_login: Joi.string()
        .min(4)
        .max(64)
        .required()
        .error(new CustomError(400, "Login xato!")),
      user_password: Joi.string()
        .required()
        .min(4)
        .error(new CustomError(400, "Parol xato!")),
    }).validateAsync(data);
  }
};
