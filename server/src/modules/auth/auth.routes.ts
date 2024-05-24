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

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: trishan@test.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    LoginResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *              accessToken:
 *                type: string
 *              refreshToken:
 *                type: string
 *        success:
 *          type: boolean
 *
 *    UserInput:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          default: Trishan
 *        email:
 *          type: string
 *          default: trishan@test.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *
 *    UserResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *              _id:
 *                type: string
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              role:
 *                type: string
 *        success:
 *          type: boolean
 *
 *    RefreshResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *              accessToken:
 *                type: string
 *        success:
 *          type: boolean
 */

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: User with this email address already exists
 *
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login with email and password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *       404:
 *         description: User with this email address doesn't exist
 *       400:
 *         description: Invalid password
 *
 * '/api/auth/me':
 *  get:
 *     tags:
 *     - Auth
 *     summary: Get Authenticated User
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserResponse'
 *       403:
 *         description: Not logged in
 *       400:
 *         description: User doesn't exists!
 *
 * '/api/auth/refresh':
 *  get:
 *     tags:
 *     - Auth
 *     summary: Generate new access token with refresh token
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: header
 *       name: x-refresh-token
 *       schema:
 *         type: string
 *       required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/RefreshResponse'
 *       400:
 *         description: Invalid or expired token
 */

