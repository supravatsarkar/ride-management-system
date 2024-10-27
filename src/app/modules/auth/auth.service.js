const config = require("../../config");
const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const { httpStatus } = require("../../helper/httpsStatus");
const logger = require("../../helper/logger");
const {
  _encryptPassword,
  _removePrivateFields,
  _generateOtp,
  _createJwtToken,
  _isPasswordMatch,
} = require("../../utils");
const { AdminModel } = require("../admin/admin.model");
const jwt = require("jsonwebtoken");

const adminRegistration = async (payload) => {
  try {
    const { password, email, ...restPayload } = payload;
    const findAdmin = await AdminModel._findOne({ email });
    if (findAdmin) {
      throw new AppError("Email already exists", httpStatus.BAD_REQUEST);
    }
    const hashPassword = await _encryptPassword(password);
    const otp = _generateOtp(6);
    let adminRes = await AdminModel._insertIntoDb({
      email,
      password: hashPassword,
      role: constants.ROLE.ADMIN,
      otp,
      ...restPayload,
    });

    // send otp to email

    adminRes = adminRes.toJSON();

    //create access and refresh token
    const accessToken = _createJwtToken(
      {
        id: adminRes.id,
        role: constants.ROLE.ADMIN,
        isOtpVerified: false,
      },
      config.jwt_access_secret,
      config.jwt_access_expire
    );

    const refreshToken = _createJwtToken(
      {
        id: adminRes.id,
        role: constants.ROLE.ADMIN,
      },
      config.jwt_refresh_secret,
      config.jwt_refresh_expire
    );

    return { ..._removePrivateFields(adminRes), accessToken, refreshToken };
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const adminLogin = async (payload) => {
  try {
    const { email, password } = payload;
    const findAdmin = await AdminModel._findOne({ email });
    if (!findAdmin) {
      throw new AppError("Invalid credentials", httpStatus.NOT_ACCEPTABLE);
    }
    const passwordMatch = await _isPasswordMatch(password, findAdmin.password);
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", httpStatus.NOT_ACCEPTABLE);
    }
    let adminRes;
    if (!findAdmin.isOtpVerified) {
      const otp = _generateOtp(6);
      adminRes = await AdminModel._updateOne(
        {
          otp,
        },
        { id: findAdmin.id }
      );
      // send otp to email
    }
    adminRes = findAdmin.toJSON();
    const accessToken = _createJwtToken(
      {
        id: adminRes.id,
        role: constants.ROLE.ADMIN,
        isOtpVerified: findAdmin.isOtpVerified,
      },
      config.jwt_access_secret,
      config.jwt_access_expire
    );

    const refreshToken = _createJwtToken(
      {
        id: adminRes.id,
        role: constants.ROLE.ADMIN,
      },
      config.jwt_refresh_secret,
      config.jwt_refresh_expire
    );

    return { ..._removePrivateFields(adminRes), accessToken, refreshToken };
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const generateAccessTokenByRefreshToken = async (refresh_token) => {
  let decode;
  try {
    decode = jwt.verify(refresh_token, config.jwt_refresh_secret);
  } catch (error) {
    throw new AppError("You are not authorize!", httpStatus.UNAUTHORIZED);
  }

  const decodedPayload = decode;

  let user = {};
  if (decodedPayload.role === constants.ROLE.ADMIN) {
    user = await AdminModel.findByPk(decodedPayload.id);
  } else if (decodedPayload.role === constants.ROLE.DRIVER) {
  } else if (decodedPayload.role === constants.ROLE.CLIENT) {
  }
  if (!user) {
    throw new AppError(
      "User not exist!. You are not authorize!",
      httpStatus.NOT_FOUND
    );
  }
  if (user.deletedAt) {
    throw new AppError(
      "User is deleted. You are not authorize!",
      httpStatus.FORBIDDEN
    );
  }

  const jwtPayload = {
    role: user.role,
    id: user.id,
    isOtpVerified: user.isOtpVerified,
  };

  const accessToken = _createJwtToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expire
  );
  return {
    accessToken,
  };
};
const otpVerify = async (token, otp) => {
  let decode;
  try {
    decode = jwt.verify(token, config.jwt_access_secret);
  } catch (error) {
    throw new AppError(
      "Invalid token. You are not authorize!",
      httpStatus.UNAUTHORIZED
    );
  }

  const decodedPayload = decode;

  let user = {};
  if (decodedPayload.role === constants.ROLE.ADMIN) {
    user = await AdminModel._findOne({ id: decodedPayload.id, otp });
    if (!user) {
      throw new AppError(
        "Invalid credentials. You are not authorize!",
        httpStatus.NOT_FOUND
      );
    }
    user = await AdminModel._updateOne(
      { otp: null, isOtpVerified: true },
      { id: decodedPayload.id }
    );
  }
  // else if (decodedPayload.role === constants.ROLE.DRIVER) {
  // } else if (decodedPayload.role === constants.ROLE.CLIENT) {
  // }
  else {
    throw new AppError("You are not authorize!", httpStatus.UNAUTHORIZED);
  }

  const jwtPayload = {
    role: user.role,
    id: user.id,
    isOtpVerified: user.isOtpVerified,
  };

  console.log("user", user);

  const accessToken = _createJwtToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expire
  );
  return {
    accessToken,
  };
};
const resendOtp = async (token) => {
  let decode;
  try {
    decode = jwt.verify(token, config.jwt_access_secret);
  } catch (error) {
    throw new AppError(
      "Invalid token. You are not authorize!",
      httpStatus.UNAUTHORIZED
    );
  }

  const decodedPayload = decode;

  let user = {};
  const otp = _generateOtp(6);
  if (decodedPayload.role === constants.ROLE.ADMIN) {
    user = await AdminModel._findOne({ id: decodedPayload.id });
    if (!user) {
      throw new AppError(
        "Invalid credentials. You are not authorize!",
        httpStatus.UNAUTHORIZED
      );
    }

    user = await AdminModel._updateOne({ otp }, { id: decodedPayload.id });
  }
  // else if (decodedPayload.role === constants.ROLE.DRIVER) {
  // } else if (decodedPayload.role === constants.ROLE.CLIENT) {
  // }
  else {
    throw new AppError("You are not authorize!", httpStatus.UNAUTHORIZED);
  }

  return !config.isProduction
    ? {
        devOTP: otp,
      }
    : null;
};

const authService = {
  adminRegistration,
  adminLogin,
  generateAccessTokenByRefreshToken,
  otpVerify,
  resendOtp,
};

module.exports = authService;
