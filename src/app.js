const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const routePrint = require("./middlewares/routePrint");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(morgan("tiny"));
app.use(routePrint());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
