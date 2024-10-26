const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const { sendErrorRes } = require("../../utils/sendErrorRes");
const authController = require("./auth.controller");

const router = require("express").Router();

router.post("/:userType/register", authController.registerController);
router.post("/:userType/login", authController.loginController);

const authRoutes = router;

module.exports = { authRoutes };
