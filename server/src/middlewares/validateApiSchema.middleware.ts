import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import httpStatus from "http-status";

import { CustomError } from "@/utils/custom-error";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        return next(
          new CustomError(
            httpStatus.UNPROCESSABLE_ENTITY,
            "There are validation errors in your request",
          ),
        );
      }
      return next(err);
    }
  };

