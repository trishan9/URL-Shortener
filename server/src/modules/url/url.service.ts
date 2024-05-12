import { ulid } from 'ulid'

import { URL } from "@/db/models/url.model";
import { TCreateUrlSchema } from "./url.api.schema";

export const createShortUrl = async (url: TCreateUrlSchema) => {
  const shortId = ulid();

  return await URL.create({
    shortenedId: shortId,
    redirectUrl: url.redirectUrl,
    analytics: [],
  });
};

export const getUrlByShortId = async (id: string) => {
  return await URL.findOne({ shortenedId: id });
};

export const updateAnalytics = async (id: string) => {
  return await URL.findOneAndUpdate({ shortenedId: id }, {
    $push: {
      analytics: {
        timestamp: Date.now(),
      }
    }
  });
};

export const getAnalyticsById = async (id: string) => {
  const url = await URL.findOne({ shortenedId: id });
  return {
    totalClicks: url?.analytics.length,
    analytics: url?.analytics,
  }
};
