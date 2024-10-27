const dotenv = require("dotenv");
dotenv.config({ path: process.cwd() + "/.env" });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === "production" ? true : false,
  isLocal: process.env.IS_LOCAL === "true" ? true : false,
  port: process.env.PORT || 5050,
  bcrypt_salt_round: Number(process.env.BCRYPT_SALT_ROUND || 10),
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire: process.env.JWT_ACCESS_EXPIRE,
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE,
  client_side_host: process.env.CLIENT_SIDE_HOST,
  server_side_host: process.env.SERVER_SIDE_HOST,
  db: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
