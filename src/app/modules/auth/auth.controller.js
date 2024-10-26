const constants = require("../../config/constants");
const { catchAsync } = require("../../utils/catchAsync");
const { sendErrorRes } = require("../../utils/sendErrorRes");
const { sendSuccessRes } = require("../../utils/sendSuccessRes");

const loginController = catchAsync((req, res) => {
  const { userType } = req.params;
  let responseDate = {};
  if (constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.ADMIN) {
    console.log("admin");
  } else if (
    constants.ROLE[String(userType).toUpperCase()] === constants.ROLE.DRIVER
  ) {
    console.log("driver");
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
  //   if (!Object.values(constants.ROLE).includes(userType)) {
  //     return sendErrorRes(res, {
  //       message: "User type not found",
  //       statusCode: 404,
  //     });
  //   }
  const { email, password } = req.body;
  return sendSuccessRes(res, {
    message: "Executed successfully",
    data: responseDate,
  });
});

const registerController = (req, res) => {
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

module.exports = { loginController, registerController };
