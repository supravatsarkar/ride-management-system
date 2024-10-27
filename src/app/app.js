const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const routePrint = require("./middlewares/routePrint");
const { notfoundHandler } = require("./middlewares/notfoundHandler");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const { sendSuccessRes } = require("./utils/sendSuccessRes");
const router = require("./router");
const cookieParser = require("cookie-parser");
const ipTrack = require("./middlewares/iptrack");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(morgan("tiny"));
app.use(routePrint());

// ip track middleware for production
// app.use(ipTrack);

// welcome route
app.get("/", (req, res) => {
  sendSuccessRes(res, {
    message: "Welcome to ride management system",
  });
});

// API routes
app.use("/api/v1", router);

//404 handler
app.all("*", notfoundHandler);

// global error handler
app.use(globalErrorHandler);

module.exports = app;
