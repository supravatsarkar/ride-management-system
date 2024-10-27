const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const { auth } = require("../../middlewares/auth");
const { sendErrorRes } = require("../../utils/sendErrorRes");
const adminController = require("./admin.controller");

const router = require("express").Router();

router.get(
  "/getMyAccount",
  auth(constants.ROLE.ADMIN),
  adminController.getMyAccount
);

const adminRoutes = router;

module.exports = { adminRoutes };
