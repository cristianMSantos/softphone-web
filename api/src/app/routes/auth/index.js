import express from 'express';
import { schema, middleware, controller } from "../../factories/auth/index.js";

const router = express.Router();

router.post("/login", schema.validateLogin, middleware.authMiddleware, controller.login);
router.post("/refresh", schema.refreshToken, middleware.authMiddleware, controller.refreshToken);

export default router;