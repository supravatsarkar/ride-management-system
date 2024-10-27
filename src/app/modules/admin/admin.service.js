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
const getMyAccountFromDb = async (user) => {
  try {
    const findAdmin = await AdminModel.findByPk(user.id);
    if (!findAdmin) {
      throw new AppError("Account Not found", httpStatus.NOT_FOUND);
    }
    return _removePrivateFields(findAdmin.toJSON());
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
const adminsService = { getMyAccountFromDb };
module.exports = adminsService;
