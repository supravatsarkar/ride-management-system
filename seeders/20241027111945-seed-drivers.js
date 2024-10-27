"use strict";
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const constants = require("../src/app/config/constants"); // Adjust path if needed
const table = "drivers";

module.exports = {
  async up(queryInterface, Sequelize) {
    const drivers = [];

    for (let i = 0; i < 43; i++) {
      const name = faker.name.fullName();
      const email = faker.internet.email();
      const password = await bcrypt.hash("Qwerty@123", 10);
      const phoneNumber = faker.string.numeric(10);
      console.log("phoneNumber", phoneNumber);
      const isOtpVerified = faker.datatype.boolean();
      const ratePerKm = parseFloat(faker.finance.amount(1, 5, 2));
      const status = faker.helpers.arrayElement([
        constants.DRIVER_STATUS.ACTIVE,
        constants.DRIVER_STATUS.INACTIVE,
        constants.DRIVER_STATUS.BUSY,
      ]);
      const rating = parseFloat(faker.finance.amount(0, 5, 1));
      const totalRides = faker.number.int({ min: 0, max: 100 });
      const totalEarnings = parseFloat(faker.finance.amount(0, 5000, 2));
      const latitude = parseFloat(faker.address.latitude());
      const longitude = parseFloat(faker.address.longitude());
      const carModel = faker.vehicle.model();
      const comfort = faker.helpers.arrayElement([
        constants.CAR_COMFORT_TYPE.CONVENIENT,
        constants.CAR_COMFORT_TYPE.ELITE,
        constants.CAR_COMFORT_TYPE.SIMPLE,
      ]);
      const plateNumber = faker.vehicle.vrm();

      drivers.push({
        name,
        email,
        password,
        phoneNumber,
        isOtpVerified,
        ratePerKm,
        status,
        rating,
        totalRides,
        totalEarnings,
        latitude,
        longitude,
        carModel,
        comfort,
        plateNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert(table, drivers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(table, null, {});
  },
};
