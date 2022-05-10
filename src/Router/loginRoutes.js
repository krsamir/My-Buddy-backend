import express from "express";
import loginController from "../Controller/loginController.js";
const router = express.Router();

router.get("/github/accesstoken", loginController.getGithubAccessToken);
export default router;
