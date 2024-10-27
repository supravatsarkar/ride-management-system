const { httpStatus } = require("../../helper/httpsStatus");
const { catchAsync } = require("../../utils/catchAsync");
const { sendSuccessRes } = require("../../utils/sendSuccessRes");
const { sendErrorRes } = require("../../utils/sendErrorRes");
const { DriverModel } = require("./driver.model");

const createDriver = catchAsync(async (req, res) => {
  const driver = await DriverModel.create(req.body);
  return sendSuccessRes(res, {
    statusCode: httpStatus.CREATED,
    message: "Driver created successfully",
    data: driver,
  });
});

const getDriver = catchAsync(async (req, res) => {
  const driver = await DriverModel.findByPk(req.params.id);
  if (!driver) {
    return sendErrorRes(res, {
      statusCode: httpStatus.NOT_FOUND,
      message: "Driver not found",
    });
  }
  return sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "Driver retrieved successfully",
    data: driver,
  });
});

const updateDriver = catchAsync(async (req, res) => {
  const driver = await DriverModel.findByPk(req.params.id);
  if (!driver) {
    return sendErrorRes(res, {
      statusCode: httpStatus.NOT_FOUND,
      message: "Driver not found",
    });
  }
  await driver.update(req.body);
  return sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "Driver updated successfully",
    data: driver,
  });
});

const deleteDriver = catchAsync(async (req, res) => {
  const driver = await DriverModel.findByPk(req.params.id);
  if (!driver) {
    return sendErrorRes(res, {
      statusCode: httpStatus.NOT_FOUND,
      message: "Driver not found",
    });
  }
  await driver.destroy();
  return sendSuccessRes(res, {
    statusCode: httpStatus.OK,
    message: "Driver deleted successfully",
  });
});

const driverController = {
  createDriver,
  getDriver,
  updateDriver,
  deleteDriver,
};

module.exports = driverController;
