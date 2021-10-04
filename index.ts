import express from "express";
import dotenv from "dotenv";
dotenv.config();
import logger from "./logger";
declare global {
  namespace NodeJS {
    interface Global {
      logger: Function;
    }
  }
}

// Create a new express app instance
const app: express.Application = express();
app.get("/", function (req, res) {
  res.send(`Hello World!`);
});
app.listen(3000, function () {
  logger.info(`app is running on port 3000!`);
});
