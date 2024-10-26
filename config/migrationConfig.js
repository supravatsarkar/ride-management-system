const defaultConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
};
module.exports = {
  development: { ...defaultConfig },
  test: { ...defaultConfig },
  production: { ...defaultConfig },
};
