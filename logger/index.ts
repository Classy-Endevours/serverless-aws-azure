import dotenv = require("dotenv");
import winston = require("winston");
dotenv.config();

import buildDevLogger from "./dev.logger";
import buildProdLogger from "./prod.logger";

let logger: winston.Logger;
if (process.env.NODE_ENV !== "prod") {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}
global.logger = logger
export default logger;
