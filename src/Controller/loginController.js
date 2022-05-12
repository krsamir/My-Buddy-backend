import axios from "axios";
import { config } from "dotenv";
const loginController = {};
config();

const { BITBUCKET_REDIRECT_URI, BITBUCKET_CLIENT_ID, BITBUCKET_CLIENT_SECRET } =
  // eslint-disable-next-line no-undef
  process.env;
loginController.getGithubAccessToken = async (req, res) => {
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
            data: response.data.access_token,
            message: "Login Success!!",
          });
        } else {
          res.send({
            status: 0,
            error: response.data.error,
            message: "Some Issue while logging in.",
          });
        }
      })
      .catch((error) => {
        res.send({
          status: 0,
          error: error.code,
          message: "Some Issue while logging in.",
        });
      });
  } catch (error) {
    res.send({
      status: 0,
      error: error.code,
      message: "Some Issue while logging in.",
    });
  }
};

loginController.bitBucketAccessToken = async (req, res, next) => {
  const { code } = req.body;
  await axios({
    method: "POST",
    url: "https://auth.atlassian.com/oauth/token",
    headers: { "Content-Type": "application/json" },
    data: {
      grant_type: "authorization_code",
      client_id: BITBUCKET_CLIENT_ID,
      client_secret: BITBUCKET_CLIENT_SECRET,
      code,
      redirect_uri: BITBUCKET_REDIRECT_URI,
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
