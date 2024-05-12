import { Router } from "express";

import authRouter from "./auth/auth.routes";
import userRouter from "./user/user.routes";
import urlRouter from "./url/url.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/URL", urlRouter);

export default router;
