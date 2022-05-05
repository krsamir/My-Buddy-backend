import { Sequelize } from "sequelize";
import env from "dotenv";
import { logger, warningLogger } from "../Utility/Logger.js";
env.config();
const {
  MYSQLDATABASE,
  MYSQLHOST,
  MYSQLPASSWORD,
  MYSQLPORT,
  MYSQLUSER,
  TIMEZONE,
  // eslint-disable-next-line no-undef
} = process.env;
const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
  host: MYSQLHOST,
  port: MYSQLPORT,
  timezone: TIMEZONE,
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    logger(`DATABASE CONNECTED TO PORT ${MYSQLPORT}`);
  })
  .catch((e) => {
    warningLogger(e);
  });

export default sequelize;
