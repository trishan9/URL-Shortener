import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import * as UserService from "./user.service";
import { CustomError } from "@/utils/custom-error";
import { TUserQuerySchema } from "./user.api.schema";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, sortField, sortOrder } = req.query as unknown as TUserQuerySchema;

    const data = await UserService.getAllUsers({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortField: sortField,
      sortOrder: sortOrder,
    });

    return res.status(httpStatus.OK).json({
      success: true,
      data
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await UserService.getUserById(id);

    if (!user) {
      throw new CustomError(httpStatus.NOT_FOUND, `User does not exists with id: ${id}`);
    }

    return res.status(httpStatus.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = req.body;

    const updatedUser = await UserService.updateUser(id, user);

    return res.status(httpStatus.OK).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserService.deleteUser(id);

    return res.status(httpStatus.OK).json({
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    return next(error);
  }
};
