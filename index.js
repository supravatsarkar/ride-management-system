const config = require("./src/config/index.js");
const logger = require("./src/helper/logger.js");
const app = require("./src/app.js");

app.listen(config.port, () => {
  console.log(`💻 App listening on port ${config.port}`);
});
