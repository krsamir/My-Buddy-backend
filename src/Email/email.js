import transporter from "./config.js";
import EmailBody from "./emailbody.js";
import { config } from "dotenv";
import { emailLogs } from "../Utility/EmailLogs.js";
import { AppConstant } from "../Utility/Constants.js";
config();
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef
const { MAIL_USER } = process.env;

const Email = {};
Email.registerMail = async (data, sentStatus) => {
  const { name, recipient, token, validTill } = data;
  var mailOptions = {
    from: MAIL_USER,
    to: recipient,
    subject: "Registration for MyBuddy",
    html: EmailBody.registerBody(name, recipient, token, validTill),
  };
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      emailLogs(
        AppConstant.FUNCTIONS.REGISTER,
        AppConstant.STATUS.FAILED,
        recipient,
        error
      );
      sentStatus(0);
    } else {
      console.log(info);
      emailLogs(
        AppConstant.FUNCTIONS.REGISTER,
        AppConstant.STATUS.FAILED,
        recipient,
        info
      );
      sentStatus(1);
    }
  });
};

export default Email;
