const { AppError } = require("../errors/AppError");

const notfoundHandler = (req, res, next) => {
  return next(new AppError("API not found", 404));
};

module.exports = { notfoundHandler };
