import express from "express";
import loginController from "../Controller/loginController.js";
const router = express.Router();

router.get("/github/accesstoken", loginController.getGithubAccessToken);
router.post("/jira/accestoken", loginController.jiraAccessToken);
export default router;
