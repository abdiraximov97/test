
const Joi = require("joi");

module.exports = class BanValidations {
	static async CreateBanValidation(data, CustomError) {
		return await Joi.object({
			user_id: Joi.string()
				.required()
				.uuid()
				.error(new CustomError(400, "User id noto'g'ri!")),
			ban_reason: Joi.string()
				.required()
				.min(10)
				.max(1024)
				.error(new CustomError(400, "Ta'qiq berishingiz sababi noto'g'ri!")),
			ban_expire_date: Joi.date()
				.required()
				.min(new Date())
				.error(new CustomError(400, "Ta'qiqning tugash vaqti noto'g'ri!")),
		}).validateAsync(data);
	}
};