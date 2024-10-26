const { Sequelize } = require("sequelize");
const config = require(".");
const logger = require("./../helper/logger");

const sequelizeConnection = new Sequelize(
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
    await sequelizeConnection.authenticate();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:");
    throw error;
  }
};

module.exports = {
  sequelizeConnection,
  connectDB,
  getTransaction: () => sequelize.transaction(),
};
