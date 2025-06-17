import { AuthRepository } from "../../repositories/auth/index.js";
import { AuthService } from "../../services/auth/index.js";
import { AuthController } from "../../controllers/auth/index.js";
import { AuthSchema } from "../../schemas/auth/index.js";
import { AuthMiddleware } from "../../middlewares/auth/index.js";
import User from "../../models/User.js";

const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

export const schema = new AuthSchema();
export const middleware = new AuthMiddleware();
export const controller = authController;
