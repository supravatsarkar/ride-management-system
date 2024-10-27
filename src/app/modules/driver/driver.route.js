const constants = require("../../config/constants");
const { auth } = require("../../middlewares/auth");
const driverController = require("./driver.controller");

const router = require("express").Router();

// CRUD routes for Driver
router.post(
  "/createDriver",
  auth(constants.ROLE.ADMIN),
  validateDriver,
  driverController.createDriver
);

router.get("/:id", auth(constants.ROLE.ADMIN), driverController.getDriver);

router.put(
  "/updateById/:id",
  auth(constants.ROLE.ADMIN),
  validateDriver,
  driverController.updateDriver
);

router.delete(
  "/deleteById/:id",
  auth(constants.ROLE.ADMIN),
  driverController.deleteDriver
);

const driverRoutes = router;

module.exports = { driverRoutes };
