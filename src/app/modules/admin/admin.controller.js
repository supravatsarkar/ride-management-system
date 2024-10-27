const { httpStatus } = require("../../helper/httpsStatus");
const { catchAsync } = require("../../utils/catchAsync");
const { sendSuccessRes } = require("../../utils/sendSuccessRes");
const adminsService = require("./admin.service");

const getMyAccount = catchAsync(async (req, res) => {
  const responseDate = await adminsService.getMyAccountFromDb(req.user);

  return sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "Executed successfully",
    data: responseDate,
  });
});

const adminController = {
  getMyAccount,
};

module.exports = adminController;
