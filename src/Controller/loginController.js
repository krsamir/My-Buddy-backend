import axios from "axios";
const loginController = {};
// import database from "../Database/database.js";

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

export default loginController;
