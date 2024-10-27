const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const ipTrack = require("../../middlewares/iptrack");
const validateRequest = require("../../middlewares/validateRequest");
const { sendErrorRes } = require("../../utils/sendErrorRes");
const authController = require("./auth.controller");
const authValidation = require("./auth.validation");

const router = require("express").Router();

router.post(
  "/:userType/register",
  ipTrack,
  validateRequest(authValidation.userRegistrationSchema),
  authController.registerController
);
router.post(
  "/:userType/login",
  ipTrack,
  validateRequest(authValidation.userLoginSchema),
  authController.loginController
);
router.post(
  "/generate-accessToken-by-refreshToken",
  validateRequest(authValidation.generateAccessTokenByRefreshToken),
  authController.generateAccessTokenByRefreshToken
);

router.post(
  "/otp-verify",
  validateRequest(authValidation.otpVerifySchema),
  authController.otpVerify
);

router.post("/resend-otp", authController.resendOtp);

const authRoutes = router;

module.exports = { authRoutes };
