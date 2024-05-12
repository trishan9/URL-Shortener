import { env } from "./env";

export default {
  app: {
    isProduction: env.NODE_ENV === "production",
  },
  discord: {
    botToken: env.DISCORD_BOT_TOKEN,
    guildId: env.DISCORD_GUILD_ID,
    clientId: env.DISCORD_BOT_ID,
  },
  api: {
    url: env.API_URL
  }
} as const;