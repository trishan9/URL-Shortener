import { z } from "zod";

import "dotenv/config";

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.string().optional(),
  CLIENT_BASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  DATABASE_URL: z.string().startsWith("mongodb+srv://"),
});

export const env = envSchema.parse(process.env);

