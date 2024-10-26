const config = require("./src/config/index.js");
const logger = require("./src/helper/logger.js");
const app = require("./src/app.js");
const { connectDB } = require("./src/config/database.js");

(async () => {
  try {
    process.env.NODE_ENV !== "production" && console.log(config);
    await connectDB();
    app.listen(config.port, () => {
      logger.info(`💻 App listening on port ${config.port}`);
    });
  } catch (error) {
    logger.error(`❌ ${error.message} Stack🔥${error.stack}`);
  }
})();

process.on("unhandledRejection", () => {
  logger.error(
    "❌ UnhandledRejection error detected.. Shutting down the server"
  );
  server.close(() => {
    process.exit(1);
  });
});
process.on("uncaughtException", () => {
  logger.error("❌ UncaughtException error detected.. ");
  process.exit(1);
});
