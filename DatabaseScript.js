import User from "./src/Model/User.js";
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

export default Task;
