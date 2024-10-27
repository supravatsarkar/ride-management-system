const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const { auth } = require("../../middlewares/auth");
const validateRequest = require("../../middlewares/validateRequest");
const { sendErrorRes } = require("../../utils/sendErrorRes");
const adminController = require("./admin.controller");
const adminValidation = require("./admin.validation");

const router = require("express").Router();

router.get(
  "/getMyAccount",
  auth(constants.ROLE.ADMIN),
  adminController.getMyAccount
);
router.post(
  "/create-driver",
  auth(constants.ROLE.ADMIN),
  validateRequest(adminValidation.createDriverSchema),
  adminController.createDriver
);
router.put(
  "/update-driver/:driverId",
  auth(constants.ROLE.ADMIN),
  validateRequest(adminValidation.updateDriverSchema),
  adminController.updateDriver
);
router.delete(
  "/delete-driver/:driverId",
  auth(constants.ROLE.ADMIN),
  adminController.deleteDriver
);

router.get(
  "/get-driver/:driverId",
  auth(constants.ROLE.ADMIN),
  adminController.getDriver
);
router.get(
  "/get-drivers",
  auth(constants.ROLE.ADMIN),
  validateRequest(adminValidation.getDriversSchema),
  adminController.getDrivers
);

const adminRoutes = router;

module.exports = { adminRoutes };
