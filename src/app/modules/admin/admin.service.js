const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const { httpStatus } = require("../../helper/httpsStatus");
const logger = require("../../helper/logger");
const {
  _encryptPassword,
  _generateOtp,
  _removePrivateFields,
} = require("../../utils");
const { DriverModel } = require("../driver/driver.model");
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
const createDriver = async (body) => {
  try {
    const { password, email, ...restBody } = body;
    const isDriverExist = await DriverModel._findOne({ email });
    if (isDriverExist) {
      throw new AppError("Email already exists", httpStatus.BAD_REQUEST);
    }
    const hashPassword = await _encryptPassword(password);
    const driverRes = await DriverModel._insertIntoDb({
      email,
      password: hashPassword,
      ...restBody,
    });
    return _removePrivateFields(driverRes.toJSON());
  } catch (error) {
    console.log(error);
    logger.error(error.message);
    throw error;
  }
};
const updateDriver = async (id, body) => {
  try {
    const isDriverExist = await DriverModel.findByPk(id);
    if (!isDriverExist) {
      throw new AppError("Driver not found", httpStatus.NOT_FOUND);
    }
    const updatedDriverRes = await DriverModel._updateOne(body, { id });
    return _removePrivateFields(updatedDriverRes.toJSON());
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
const getDriverById = async (id) => {
  try {
    const isDriverExist = await DriverModel.findByPk(id);
    if (!isDriverExist) {
      throw new AppError("Driver not found", httpStatus.NOT_FOUND);
    }
    return _removePrivateFields(isDriverExist.toJSON());
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const deleteDriver = async (id) => {
  try {
    const isDriverExist = await DriverModel.findByPk(id);
    if (!isDriverExist) {
      throw new AppError("Driver not found", httpStatus.NOT_FOUND);
    }
    const updatedDriverRes = await DriverModel._softDelete({ id });
    return {};
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
const getDrivers = async (query) => {
  try {
    const { page, limit, sort, order } = query;
    console.log({ query });
    const { records, total, currentPage, totalPages } =
      await DriverModel._getListByFilter({
        page,
        limit,
        sort,
        order,
      });
    return { records, total, currentPage, totalPages };
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
const adminsService = {
  getMyAccountFromDb,
  createDriver,
  updateDriver,
  deleteDriver,
  getDriverById,
  getDrivers,
};
module.exports = adminsService;
