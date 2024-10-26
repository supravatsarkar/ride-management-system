const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelizeConnection } = require("../../config/database");
const constants = require("../../config/constants");

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(
        constants.ROLE.ADMIN,
        constants.ROLE.DRIVER,
        constants.ROLE.CLIENT
      ),
      allowNull: false,
      defaultValue: constants.ROLE.CLIENT,
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
    modelName: "users",
  }
);

module.exports = { UserModel };
