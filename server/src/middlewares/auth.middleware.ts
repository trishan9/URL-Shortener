import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { CustomError } from "@/utils/custom-error";
import token from "@/lib/token";
import * as UserService from "@/modules/user/user.service";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new CustomError(httpStatus.UNAUTHORIZED, "No authorization header provided");
    }

    const headerParts = authHeader.split(" ");
    if (headerParts.length !== 2 || headerParts[0] !== 'Bearer') {
      throw new CustomError(httpStatus.UNAUTHORIZED, "Invalid authorization header format");
    }

    const accessToken = headerParts[1];
    const decoded = token.verify({ token: accessToken, type: "access" });

    if (!decoded) {
      throw new CustomError(httpStatus.UNAUTHORIZED, "Invalid or expired token")
    }

    res.locals.user = decoded;

    const exists = await UserService.getUserById(res.locals.user.id);
    if (!exists) {
      throw new CustomError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

export function requireAdmin(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = res.locals.user;

    if (user.role !== "admin") {
      throw new CustomError(httpStatus.FORBIDDEN, "Forbidden Access");
    }

    return next();
  } catch (err) {
    return next(err);
  }
}