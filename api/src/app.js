import "express-async-errors";

import express from "express";
import cors from "cors";
import routes from "./app/routes/index.js";
import logger from "../config/logger.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://main.d2mpx1hgygt1vb.amplifyapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api", routes);

app.use((error, req, res, next) => {
  logger.error(error);
  res
    .status(error.status || 500)
    .json({ message: error.message || "Server Internal Error" });
});

export default app;
