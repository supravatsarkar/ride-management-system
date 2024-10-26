const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const { httpStatus } = require("../../helper/httpsStatus");
const logger = require("../../helper/logger");
const {
  _encryptPassword,
  _removePrivateFields,
  _generateOtp,
} = require("../../utils");
const { AdminModel } = require("../admin/admin.model");

const adminRegistration = async (payload) => {
  try {
    const { password, email, ...restPayload } = payload;
    const findAdmin = await AdminModel._findOne({ email });
    if (findAdmin) {
      throw new AppError("Email already exists", httpStatus.BAD_REQUEST);
    }
    const hashPassword = await _encryptPassword(password);
    const otp = _generateOtp(6);
    const adminRes = await AdminModel._insertIntoDb({
      email,
      password: hashPassword,
      role: constants.ROLE.ADMIN,
      otp,
      ...restPayload,
    });
    return _removePrivateFields(adminRes);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const authService = {
  adminRegistration,
};

module.exports = authService;
