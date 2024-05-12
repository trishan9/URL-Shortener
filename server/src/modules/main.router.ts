import { Router } from "express";

import authRouter from "./auth/auth.routes";
import userRouter from "./user/user.routes";
import urlRouter from "./url/url.routes";
import docsRouter from "./swagger/swagger.route";

const router = Router();

// API Routes
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/URL", urlRouter);

// Docs Rotes
router.use('/docs', docsRouter);

export default router;
