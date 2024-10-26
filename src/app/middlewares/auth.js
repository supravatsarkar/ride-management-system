const config = require("../config");
const constants = require("../config/constants");
const { AppError } = require("../errors/AppError");
const { httpStatus } = require("../helper/httpsStatus");
const logger = require("../helper/logger");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../modules/admin/admin.model");
const { log } = require("winston");
const { catchAsync } = require("../utils/catchAsync");

const auth = (...userRoles) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.headers?.authorization?.split(" ")[1];
    logger.info({ accessToken });
    if (!accessToken) {
      throw new AppError("You are not authorize!", httpStatus.UNAUTHORIZED);
    }

    let decode;
    try {
      decode = jwt.verify(accessToken, config.jwt_access_secret);
    } catch (error) {
      throw new AppError("You are not authorize!", httpStatus.UNAUTHORIZED);
    }
    logger.info({ decode });
    const decodedPayload = decode;
    if (userRoles && !userRoles.includes(decodedPayload.role)) {
      throw new AppError("You are not authorize!", httpStatus.UNAUTHORIZED);
    }

    let user = {};
    if (decodedPayload.role === constants.ROLE.ADMIN) {
      const isAdminExist = await AdminModel.findByPk(decodedPayload.id);
      logger.info({ isAdminExist });
      if (!isAdminExist) {
        throw new AppError(
          "User not exist!. You are not authorize!",
          httpStatus.NOT_FOUND
        );
      }
      if (isAdminExist.deletedAt) {
        throw new AppError(
          "User is deleted. You are not authorize!",
          httpStatus.FORBIDDEN
        );
      }
      user = isAdminExist;
    } else if (decodedPayload.role === constants.ROLE.DRIVER) {
      // driver
    } else if (decodedPayload.role === constants.ROLE.CLIENT) {
      // client
    }

    if (!user.isOtpVerified) {
      throw new AppError(
        "You are not authorize! Please verify your OTP",
        httpStatus.UNAUTHORIZED
      );
    }

    req.user = decodedPayload;

    next();
  });
};

module.exports = { auth };
