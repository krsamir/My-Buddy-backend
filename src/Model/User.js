import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js";
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    password: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    organization: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
    token: {
      type: DataTypes.STRING,
    },
    validTill: {
      type: DataTypes.DATE,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    invalidLogins: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
  },
  {}
);
export default User;
