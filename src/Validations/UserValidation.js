const Joi = require("joi");

module.exports = class UserValidations {
  static async UserCreateAccountValidation(data, CustomError) {
    return await Joi.object({
      user_password: Joi.string()
        .required()
        .min(4)
        .max(64)
        .error(new CustomError(400, "Parol xato!")),
      user_name: Joi.string()
        .min(4)
        .max(128)
        .required()
        .error(new CustomError(400, "Ism xato!")),
      user_email: Joi.string()
        .email()
        .required()
        .lowercase()
        .error(new CustomError(400, "Email xato!")),
      user_gender: Joi.string()
        .valid("male", "female")
        .required()
        .error(new CustomError(400, "Jins noto'g'ri!")),
      user_phone: Joi.string()
        .required()
        .error(new CustomError(400, "Telefon raqam noto'g'ri"))
        .regex(/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/),
    }).validateAsync(data);
  }

  static async UserLoginValidation(data, CustomError) {
    return await Joi.object({
      user_email: Joi.string()
        .email()
        .required()
        .lowercase()
        .error(new CustomError(400, "Email xato!")),
      user_password: Joi.string()
        .required()
        .min(4)
        .max(64)
        .error(new CustomError(400, "Parol xato!")),
    }).validateAsync(data);
  }

  static async UserForgatPasswordValidation(data, CustomError) {
    return await Joi.object({
      user_email: Joi.string()
        .email()
        .required()
        .lowercase()
        .error(new CustomError(400, "Email xato!")),
    }).validateAsync(data);
  }
};
