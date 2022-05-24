import User from "./src/Model/User.js";
import EmailLogs from "./src/Model/EmailLogs.js";
const Task = {};
const log = console.log;
Task.addUserTable = () => {
  User.sync()
    .then(() => {
      log(`User Table Created.`);
    })
    .catch((e) => {
      log(e);
    });
};

Task.addEmailLogTable = () => {
  EmailLogs.sync()
    .then(() => {
      log(`Email Log Table Created.`);
    })
    .catch((e) => {
      log(e);
    });
};

export default Task;
