import bcryptjs from "bcryptjs";
import moment from "moment";
// import jwt from "jsonwebtoken";
import axios from "axios";
import { config } from "dotenv";
import sequelize from "../Database/database.js";
import User from "../Model/User.js";
import Sequelize from "sequelize";
import Email from "../Email/email.js";
const loginController = {};

config();

const { JIRA_REDIRECT_URI, JIRA_CLIENT_ID, JIRA_CLIENT_SECRET } =
  // eslint-disable-next-line no-undef
  process.env;
loginController.register = async (req, res) => {
  const { name, email, dob, mobile, password, organization, role } = req.body;
  try {
    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(password, salt);
    const token = Math.random().toString().substring(2, 8);
    const validTill = moment().add(10, "minute").format("YYYY-MM-DD HH:mm:ss");
    const t = await sequelize.transaction();
    User.create(
      {
        name,
        email,
        dob,
        password: hashedPassword,
        mobile,
        organization,
        role,
        isActive: false,
        token,
        validTill,
      },
      { transaction: t }
    )
      .then(() => {
        const emailObject = { name, recipient: email, token, validTill };
        Email.registerMail(emailObject, async (data) => {
          if (data === 1) {
            await t.commit();
            res.send({
              status: 1,
              message:
                "An OTP has been sent to the registered email. Please verify before it expires.",
            });
          } else {
            await t.rollback();
            res.status(500).send({
              status: 0,
              message: "Some issue while Sending Mail.",
              reason: "Mail not Sent",
            });
          }
        });
      })
      .catch(async (error) => {
        console.log(error);
        await t.rollback();
        res.status(500).send({
          status: 0,
          message: "Some issue while registering user.",
          reason: error?.errors?.map((error) => error.message),
        });
      });
  } catch (error) {
    console.log(error);
    if (error instanceof Sequelize.BaseError) {
      res.status(500).send({
        status: 0,
        message: "Some issue while registering user.",
        reason: error?.errors?.map((error) => error.message),
      });
    } else {
      res.status(500).send({
        status: 0,
        message: "Some issue while registering user.",
        reason: error,
      });
    }
  }
};

loginController.getGithubAccessToken = async (req, res, next) => {
  try {
    const code = req.query.code;
    const params = new URLSearchParams();
    // eslint-disable-next-line no-undef
    params.append("client_id", process.env.GITHUBCLIENTID);
    // eslint-disable-next-line no-undef
    params.append("client_secret", process.env.GITHUBCLIENTSECRET);
    params.append("code", code);

    await axios
      // eslint-disable-next-line no-undef
      .post(process.env.GITHUBACCESSTOKENURL, null, {
        params,
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        res.cookie("access_token", response.data.access_token);
        if (response.data.access_token) {
          res.send({
            status: 1,
            message: "Login Success!!",
          });
        } else {
          next();
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
};

loginController.jiraAccessToken = async (req, res, next) => {
  const { code } = req.body;
  await axios({
    method: "POST",
    url: "https://auth.atlassian.com/oauth/token",
    headers: { "Content-Type": "application/json" },
    data: {
      grant_type: "authorization_code",
      client_id: JIRA_CLIENT_ID,
      client_secret: JIRA_CLIENT_SECRET,
      code,
      redirect_uri: JIRA_REDIRECT_URI,
    },
  })
    .then((response) => {
      res.cookie("access_token", response.data.access_token);
      res.send({ status: 1 });
    })
    .catch((e) => {
      next(e);
    });
};
export default loginController;
