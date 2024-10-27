const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../../config/database");
const { BaseModel } = require("../../helper/BaseModel");
const constants = require("../../config/constants");

class DriverModel extends BaseModel {}

DriverModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
    },
    otp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    isOtpVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ratePerKm: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        constants.DRIVER_STATUS.ACTIVE,
        constants.DRIVER_STATUS.INACTIVE,
        constants.DRIVER_STATUS.BUSY
      ),
      defaultValue: constants.DRIVER_STATUS.INACTIVE,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    totalRides: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalEarnings: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carModel: {
      type: DataTypes.STRING,
    },
    comfort: {
      type: DataTypes.ENUM(
        constants.CAR_COMFORT_TYPE.CONVENIENT,
        constants.CAR_COMFORT_TYPE.ELITE,
        constants.CAR_COMFORT_TYPE.SIMPLE
      ),
      allowNull: false,
    },
    plateNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    modelName: "driver",
  }
);

module.exports = { DriverModel };
