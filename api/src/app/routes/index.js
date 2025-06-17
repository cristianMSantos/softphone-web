import express from "express";
import authRoutes from "./auth/index.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Connected to backend!" });
});

export default router;
