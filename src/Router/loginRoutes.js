import express from "express";
import loginController from "../Controller/loginController.js";
const router = express.Router();

router.post("/github/accesstoken", loginController.getGithubAccessToken);
export default router;
