import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import * as UrlService from "./url.service";
import { CustomError } from "@/utils/custom-error";

export const createShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const url = await UrlService.createShortUrl(req.body);

    return res.status(httpStatus.OK).json({
      success: true,
      data: url,
    });
  } catch (error) {
    return next(error);
  }
};

export const redirectToLongUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const url = await UrlService.getUrlByShortId(id);

    if (!url) {
      throw new CustomError(
        httpStatus.NOT_FOUND,
        `Short url does not exists with id: ${id}`,
      );
    }

    await UrlService.updateAnalytics(id);

    return res.status(httpStatus.PERMANENT_REDIRECT).redirect(url.redirectUrl);
  } catch (error) {
    return next(error);
  }
};

export const getAnalyticsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const analytics = await UrlService.getAnalyticsById(id);

    if (!analytics) {
      throw new CustomError(
        httpStatus.NOT_FOUND,
        `User does not exists with id: ${id}`,
      );
    }

    return res.status(httpStatus.OK).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    return next(error);
  }
};
