import { Router } from "express";

import * as AuthController from "./auth.controller";
import { isAuthenticated } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validateApiSchema.middleware";
import { loginSchema, userSchema } from "./auth.api.schema";

const authRouter = Router();

authRouter.post("/register", validate(userSchema), AuthController.register);
authRouter.post("/login", validate(loginSchema), AuthController.login);

authRouter.get("/refresh", AuthController.refresh);
authRouter.get("/me", isAuthenticated, AuthController.getMe);

export default authRouter;
