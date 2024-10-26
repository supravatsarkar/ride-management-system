const { stack } = require("sequelize/lib/utils");
const { sendErrorRes } = require("../utils/sendErrorRes");
const { sendSuccessRes } = require("../utils/sendSuccessRes");
const { AppError } = require("../errors/AppError");
const logger = require("../helper/logger");

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let stack = err.stack;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
  }

  logger.error(`Error: ${message} ${stack}`);
  sendErrorRes(res, {
    stack: stack,
    message: message,
    statusCode: statusCode,
  });
};

module.exports = { globalErrorHandler };
