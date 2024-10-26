const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const { httpStatus } = require("../../helper/httpsStatus");
const logger = require("../../helper/logger");
const {
  _encryptPassword,
  _generateOtp,
  _removePrivateFields,
} = require("../../utils");
const { AdminModel } = require("./admin.model");

const adminsService = {};
module.exports = adminsService;
