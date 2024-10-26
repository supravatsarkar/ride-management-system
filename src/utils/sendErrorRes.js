const config = require("../config");

const sendErrorRes = (
  res,
  {
    stack = null,
    errorDetails = null,
    message = "Something went wrong",
    statusCode = 500,
  }
) => {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorDetails,
    stack:
      config.NODE_ENV === "production"
        ? null
        : stack
        ? stack.split("\n")
        : stack,
  });
};

module.exports = { sendErrorRes };
