"use strict";

const constants = require("../src/app/config/constants");

/** @type {import('sequelize-cli').Migration} */
const table = "users";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM(
          constants.ROLE.ADMIN,
          constants.ROLE.DRIVER,
          constants.ROLE.CLIENT
        ),
        allowNull: false,
        defaultValue: constants.ROLE.CLIENT,
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
