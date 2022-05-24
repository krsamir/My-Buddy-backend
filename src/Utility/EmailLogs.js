import EmailLogs from "../Model/EmailLogs.js";
import moment from "moment";
export const emailLogs = (type, status, recipient, issuetype) => {
  EmailLogs.create({
    type,
    status,
    recipient,
    issuetype,
    dateoftrigger: moment().format("YYYY-MM-DD"),
    timeoftrigger: moment().format("HH:mm:ss"),
  });
};
