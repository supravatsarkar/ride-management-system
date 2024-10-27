const geoip = require("geoip-lite");
const { httpStatus } = require("../helper/httpsStatus");
const { sendErrorRes } = require("../utils/sendErrorRes");
const constants = require("../config/constants");
const { isProduction } = require("../config");
const config = require("../config");

const ipTrack = (req, res, next) => {
  if (config.isLocal) return next();
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  // test ips: AF "103.104.146.0", US ""207.97.227.239""
  const geo = geoip.lookup(ip);
  console.log(geo);
  if (constants.RESTRICT_COUNTRY.includes(geo.country)) {
    return sendErrorRes(res, {
      message: "Your country is not allowed",
      statusCode: httpStatus.FORBIDDEN,
    });
  } else {
    next();
  }
};

module.exports = ipTrack;
