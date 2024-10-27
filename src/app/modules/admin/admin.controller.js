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
const createDriver = catchAsync(async (req, res) => {
  const responseDate = await adminsService.createDriver(req.body);

  return sendSuccessRes(res, {
    statusCode: httpStatus.CREATED,
    message: "Driver created successfully",
    data: responseDate,
  });
});
const updateDriver = catchAsync(async (req, res) => {
  const { driverId } = req.params;
  const responseDate = await adminsService.updateDriver(driverId, req.body);

  return sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "Driver updated successfully",
    data: responseDate,
  });
});
const deleteDriver = catchAsync(async (req, res) => {
  const { driverId } = req.params;
  const responseDate = await adminsService.deleteDriver(driverId);

  return sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "Driver deleted successfully",
    data: responseDate,
  });
});

const getDriver = catchAsync(async (req, res) => {
  const { driverId } = req.params;
  const responseDate = await adminsService.getDriverById(driverId);

  return sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "Driver retrieved successfully",
    data: responseDate,
  });
});
const getDrivers = catchAsync(async (req, res) => {
  const { records, total, currentPage, totalPages } =
    await adminsService.getDrivers(req.query);

  return sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "Drivers retrieved successfully",
    meta: { total, currentPage, totalPages },
    data: records,
  });
});

const adminController = {
  getMyAccount,
  createDriver,
  updateDriver,
  deleteDriver,
  getDriver,
  getDrivers,
};

module.exports = adminController;
