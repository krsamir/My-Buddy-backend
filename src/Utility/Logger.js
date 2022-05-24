import chalk from "chalk";
import { config } from "dotenv";

config();

// eslint-disable-next-line no-undef
const { NODE_ENV } = process.env;
const log = console.log;
const inverse = chalk.inverse;
const greenBackGround = chalk.bgGreen;
const yellowBackGround = chalk.bgYellow;
const bgRed = chalk.bgRed;
export const logger = (data, type = "green") => {
  if (type === "green") {
    log(greenBackGround(data));
  }
};

export const apiLogger = (req, res, next) => {
  const { url, method, body } = req;
  if (url.match("/auth")) {
    log(
      inverse(
        `[ METHOD: ${method}  ROUTE: ${url} at ${new Date().toLocaleString()} ]`
      )
    );
  }
  if (NODE_ENV === "development" && method !== "GET") {
    log(yellowBackGround(`Payload:`));
    log(body);
  }
  next();
};

// eslint-disable-next-line no-unused-vars
export const errorLogger = (err, req, res, next) => {
  log(bgRed(err));
  res.status(500).send({ status: 0, message: "Caught into some issue" });
};
export const warningLogger = (data) => {
  log(bgRed(data));
};
