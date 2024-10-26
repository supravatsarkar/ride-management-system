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
    responseDate = await authService.adminRegistration(req.body);
  } else if (
    constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.DRIVER
  ) {
  } else if (
    constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.CLIENT
  ) {
    console.log("client");
  } else {
    return sendErrorRes(res, {
      message: "User type not found",
      statusCode: 404,
    });
  }

  return sendSuccessRes(res, {
    statusCode: httpStatus.CREATED,
    message: "Register success!",
    data: responseDate,
  });
});

const loginController = (req, res) => {
  const { userType } = req.params;
  if (!Object.values(constants.ROLE).includes(userType)) {
    return sendErrorRes(res, {
      message: "User type not found",
      statusCode: 404,
    });
  }
  const { email, password } = req.body;
  return res.send({ userType, email, password });
};

const authController = { registerController, loginController };
module.exports = authController;
