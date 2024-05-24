import { Router } from "express";

import * as UrlController from "./url.controller";
import { isAuthenticated, requireAdmin } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validateApiSchema.middleware";
import { createUrlSchema } from "./url.api.schema";

const urlRouter = Router();

urlRouter.post(
  "/",
  isAuthenticated,
  validate(createUrlSchema),
  UrlController.createShortUrl,
);
urlRouter.get(
  "/analytics/:id",
  isAuthenticated,
  requireAdmin,
  UrlController.getAnalyticsById,
);

export default urlRouter;
