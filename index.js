const config = require("./config/index.js");
const logger = require("./helper/logger.js");
const app = require("./src/app.js");

app.listen(config.port, () => {
  console.log(`💻 App listening on port ${config.port}`);
});
