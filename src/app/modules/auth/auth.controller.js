const config = require("../../config");
const constants = require("../../config/constants");
const { httpStatus } = require("../../helper/httpsStatus");
const { catchAsync } = require("../../utils/catchAsync");
const { sendErrorRes } = require("../../utils/sendErrorRes");
const { sendSuccessRes } = require("../../utils/sendSuccessRes");
const authService = require("./auth.service");

const registerController = catchAsync(async (req, res) => {
  const { userType } = req.params;
  let responseDate = {};
  if (constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.ADMIN) {
    // admin registration
    responseDate = await authService.adminRegistration(req.body);
  } else if (
    constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.DRIVER
  ) {
    // driver registration
    console.log("// driver registration");
  } else if (
    constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.CLIENT
  ) {
    // client registration
    console.log("// client registration");
  } else {
    return sendErrorRes(res, {
      message: "User type not found",
      statusCode: 404,
    });
  }

  const { refreshToken, ...restResponse } = responseDate;
  res.cookie("refresh_token", refreshToken, {
    secure: config.isProduction,
    httpOnly: true,
  });

  return sendSuccessRes(res, {
    statusCode: httpStatus.CREATED,
    message: "Register success!",
    data: restResponse,
  });
});

const loginController = catchAsync(async (req, res) => {
  const { userType } = req.params;
  let responseDate = {};
  if (constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.ADMIN) {
    // admin login
    responseDate = await authService.adminLogin(req.body);
  } else if (
    constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.DRIVER
  ) {
    // driver login
    console.log("// driver login");
  } else if (
    constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.CLIENT
  ) {
    // client login
    console.log("// client login");
  } else {
    return sendErrorRes(res, {
      message: "User type not found",
      statusCode: 404,
    });
  }

  const { refreshToken, ...restResponse } = responseDate;
  res.cookie("refresh_token", refreshToken, {
    secure: config.isProduction,
    httpOnly: true,
  });

  return sendSuccessRes(res, {
    statusCode: httpStatus.CREATED,
    message: "Login success!",
    data: restResponse,
  });
});

const generateAccessTokenByRefreshToken = catchAsync(async (req, res) => {
  const { refresh_token } = req.cookies;
  const result = await authService.generateAccessTokenByRefreshToken(
    refresh_token
  );
  sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "AccessToken retrieved successfully",
    data: result,
  });
});

const otpVerify = catchAsync(async (req, res) => {
  const { otp } = req.body;
  const accessToken = req.headers.authorization.split(" ")[1];
  const result = await authService.otpVerify(accessToken, otp);
  sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "OTP verified successfully",
    data: result,
  });
});
const resendOtp = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const result = await authService.resendOtp(accessToken);
  sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "OTP resend successfully",
    data: result,
  });
});

const authController = {
  registerController,
  loginController,
  generateAccessTokenByRefreshToken,
  otpVerify,
  resendOtp,
};
module.exports = authController;
