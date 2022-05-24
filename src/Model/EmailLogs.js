import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js";
const EmailLogs = sequelize.define(
  "EmailLogs",
  {
    type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    dateoftrigger: {
      type: DataTypes.DATEONLY,
    },
    timeoftrigger: {
      type: DataTypes.TIME,
    },
    recipient: {
      type: DataTypes.STRING,
    },
    issuetype: {
      type: DataTypes.JSON,
    },
  },
  {}
);
export default EmailLogs;
