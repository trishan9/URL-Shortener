import { Router } from "express";

import * as UserController from "./user.controller";
import { isAuthenticated, requireAdmin } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validateApiSchema.middleware";
import { updateUserSchema, userQuerySchema } from "./user.api.schema";

const userRouter = Router();

userRouter.get("/", isAuthenticated, requireAdmin, UserController.getAllUsers);

userRouter.get("/:id", isAuthenticated, UserController.getUserById);
userRouter.patch(
  "/:id",
  validate(updateUserSchema),
  isAuthenticated,
  UserController.updateUser,
);
userRouter.delete("/:id", isAuthenticated, UserController.deleteUser);

export default userRouter;

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateUserInput:
 *      type: object
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
 *    AllUserResponse:
 *      type: object
 *      properties:
 *        data:
 *          type: object
 *          properties:
 *              users:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    email:
 *                      type: string
 *                    role:
 *                      type: string
 *              total:
 *                type: number
 *              totalPages:
 *                type: number
 *              currentPage:
 *                type: number
 *              perPage:
 *                type: number
 *        success:
 *          type: boolean
 */

/**
 * @openapi
 * '/api/user':
 *  get:
 *     tags:
 *     - Admin Only
 *     summary: Get All Users
 *     security:
 *     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllUserResponse'
 *      404:
 *        description: User does not exists
 *
 * '/api/user/{userId}':
 *  get:
 *     tags:
 *     - User
 *     summary: Get User by ID
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *        type: string
 *       description: User ID
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      404:
 *        description: User does not exists
 *
 *  patch:
 *     tags:
 *     - User
 *     summary: Update user details
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *        type: string
 *       description: User ID
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User with this email address doesn't exist
 *
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete user account
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *       required: true
 *       schema:
 *        type: string
 *       description: User ID
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User with this email address doesn't exist
 */

