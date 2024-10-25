const Sequelize = require("sequelize");
const config = require(".");
const logger = require("./../helper/logger");

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "postgres",
    logging: (msg) => logger.info(msg),
  }
);

// connect to database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:");
    throw error;
  }
};

module.exports = {
  sequelize,
  connectDB,
  getTransaction: () => sequelize.transaction(),
};
