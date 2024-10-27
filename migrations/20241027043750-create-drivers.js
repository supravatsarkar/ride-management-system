"use strict";

const constants = require("../src/app/config/constants");
const table = "drivers";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
      },
      otp: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      isOtpVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      ratePerKm: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          constants.DRIVER_STATUS.ACTIVE,
          constants.DRIVER_STATUS.INACTIVE,
          constants.DRIVER_STATUS.BUSY
        ),
        defaultValue: constants.DRIVER_STATUS.INACTIVE,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      totalRides: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalEarnings: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      carModel: {
        type: Sequelize.STRING,
      },
      comfort: {
        type: Sequelize.ENUM(
          constants.CAR_COMFORT_TYPE.CONVENIENT,
          constants.CAR_COMFORT_TYPE.ELITE,
          constants.CAR_COMFORT_TYPE.SIMPLE
        ),
        allowNull: false,
      },
      plateNumber: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(table);
  },
};
