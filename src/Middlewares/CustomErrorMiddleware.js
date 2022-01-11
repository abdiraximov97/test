const CustomError = require("../Helpers/CustomError");

module.exports.customErrorMiddleware = function customErrorMiddleware(
	req,
	res,
	next
) { 
	res.error = CustomError.CustomError;
	next();
};