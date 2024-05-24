import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import * as AuthService from "./auth.service";
import { CustomError } from "@/utils/custom-error";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.body;

    const registeredUser = await AuthService.register(user);

    return res.status(httpStatus.CREATED).json({
      success: true,
      data: registeredUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const tokens = await AuthService.login(email, password);

    res.status(httpStatus.CREATED).json({
      success: true,
      data: tokens,
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refToken = req.headers["x-refresh-token"];
    if (!refToken) {
      throw new CustomError(
        httpStatus.BAD_REQUEST,
        "Refresh token is required",
      );
    }

    const token = await AuthService.refresh(refToken as string);

    res.status(httpStatus.OK).json({
      success: true,
      data: token,
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await AuthService.getMe(res.locals.user.id);
    res.status(httpStatus.OK).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
