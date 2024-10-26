const constants = require("../../config/constants");
const { AppError } = require("../../errors/AppError");
const { sendErrorRes } = require("../../utils/sendErrorRes");
const { loginController, registerController } = require("./auth.controller");

const router = require("express").Router();

router.post("/:userType/register", registerController);
router.post("/:userType/login", loginController);

const authRoutes = router;

module.exports = { authRoutes };
