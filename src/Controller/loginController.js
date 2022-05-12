import axios from "axios";
const loginController = {};
// import database from "../Database/database.js";

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

export default loginController;
