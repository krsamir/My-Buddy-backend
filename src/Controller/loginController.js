import axios from "axios";
import { config } from "dotenv";
const loginController = {};
config();

const { JIRA_REDIRECT_URI, JIRA_CLIENT_ID, JIRA_CLIENT_SECRET } =
  // eslint-disable-next-line no-undef
  process.env;
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
