import { CorsOptions } from "cors";

import { env } from "./env";

export default {
  app: {
    port: env.PORT,
    isProduction: env.NODE_ENV === "production",
  },
  cors: {
    origin: [
      "http://localhost:8000",
      "http://127.0.0.1:8000",
      env.CLIENT_BASE_URL,
    ],
    credentials: true,
  } as CorsOptions,
  database: {
    mongodb: {
      url: env.DATABASE_URL,
    },
  },
  jwt: {
    secret: env.JWT_SECRET,
    accessToken: {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    },
    refreshToken: {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    },
  },
} as const;

