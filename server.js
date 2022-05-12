import express from "express";
import env from "dotenv";
import loginRoutes from "./src/Router/loginRoutes.js";
import { apiLogger, logger, errorLogger } from "./src/Utility/Logger.js";
import cors from "cors";
env.config();

// eslint-disable-next-line no-undef
const { PORT, NODE_ENV } = process.env;
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((err, req, res, next) => errorLogger(err, req, res, next));
app.use((req, res, next) => apiLogger(req, res, next));
app.use("/auth", loginRoutes);

app.listen(PORT, () =>
  logger(
    `APP STARTED IN ${NODE_ENV} MODE ON PORT ${PORT} AT ${new Date().toLocaleString()}`,
    "green"
  )
);
