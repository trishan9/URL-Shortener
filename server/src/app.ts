import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import httpStatus from "http-status";

import { logger } from "./lib/logger";
import { CustomError } from "./utils/custom-error";

import config from "./config";
import router from "./modules/main.router";
import { redirectToLongUrl } from "./modules/url/url.controller";

export const createApp = () => {
    const app: Express = express();
    const port = config.app.port;

    app.use(cors(config.cors));
    app.use(express.json());
    app.use(helmet());

    /**
    * @openapi
    * /health-check:
    *  get:
    *     tags:
    *     - Health-check
    *     description: Responds if the app is up and running
    *     responses:
    *       200:
    *         description: App is up and running
    */
    app.get('/health-check', (req: Request, res: Response) => {
        res.status(httpStatus.OK).send('OK');
    });

    // API Routes
    app.use("/api", router);
    app.use("/:id", redirectToLongUrl);

    // 404 handler
    app.use((_req: Request, _res: Response, next: NextFunction) => {
        next(new CustomError(httpStatus.NOT_FOUND, "endpoint not found"));
    });

    // Centralized error handler
    app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
        const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || "Internal Server Error.";

        logger.error(message);

        return res.status(statusCode).json({ success: false, message });
    });

    return app;
}