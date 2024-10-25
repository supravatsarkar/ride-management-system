const dotenv = require("dotenv");
dotenv.config({ path: process.cwd() + "/.env" });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5050,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire: process.env.JWT_ACCESS_EXPIRE,
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE,
  client_side_host: process.env.CLIENT_SIDE_HOST,
  server_side_host: process.env.SERVER_SIDE_HOST,
};
