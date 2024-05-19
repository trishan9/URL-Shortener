import { z } from "zod";

import "dotenv/config";

const envSchema = z.object({
    NODE_ENV: z.string().optional(),
    PORT: z.string().optional(),
    API_URL: z.string().optional(),
    DISCORD_BOT_TOKEN: z.string().optional(),
    DISCORD_GUILD_ID: z.string().optional(),
    DISCORD_BOT_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);