const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeConnection } = require("../../config/database");
const { BaseModel } = require("../../helper/BaseModel");

class AdminModel extends BaseModel {}

AdminModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
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
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    modelName: "admins",
  }
);

module.exports = { AdminModel };
