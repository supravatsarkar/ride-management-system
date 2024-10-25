const logger = require("../helper/logger");
const routePrint = () => (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  logger.info(`➡️  ${ip} ${req.method}  ${req.url}`);
  next();
};
module.exports = routePrint;
