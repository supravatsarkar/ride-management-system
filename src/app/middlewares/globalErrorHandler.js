const { sendErrorRes } = require("../utils/sendErrorRes");
const { AppError } = require("../errors/AppError");
const logger = require("../helper/logger");
const { ZodError } = require("zod");
const handleZodError = require("../errors/handelZodError");
const globalErrorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let stack = err.stack;
  let errorDetails = null;

  if (err instanceof ZodError) {
    console.log("==>Zod validation error");
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorDetails = simplifiedError.errorDetails;
  }
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
    errorDetails,
  });
};

module.exports = { globalErrorHandler };
