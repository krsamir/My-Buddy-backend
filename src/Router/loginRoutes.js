import express from "express";
import loginController from "../Controller/loginController.js";
import env from "dotenv";
env.config();
const router = express.Router();

router.post("/register", loginController.register);
router.post("/verify", loginController.verification);
router.get("/github/accesstoken", loginController.getGithubAccessToken);
router.post("/jira/accestoken", loginController.jiraAccessToken);
export default router;
