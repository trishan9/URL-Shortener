import { Router } from "express";

import * as UserController from "./user.controller";
import { isAuthenticated, requireAdmin } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validateApiSchema.middleware";
import { updateUserSchema, userQuerySchema } from "./user.api.schema";

const userRouter = Router();

userRouter.get("/", isAuthenticated, requireAdmin, UserController.getAllUsers)

userRouter.get("/:id", isAuthenticated, UserController.getUserById);
userRouter.patch("/:id", validate(updateUserSchema), isAuthenticated, UserController.updateUser);
userRouter.delete("/:id", isAuthenticated, UserController.deleteUser);

export default userRouter;
