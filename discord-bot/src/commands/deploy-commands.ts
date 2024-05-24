import { REST, Routes } from "discord.js";
import config from "../config";
import commands from "./commands";

const rest = new REST({ version: "10" }).setToken(
  config.discord.botToken as string,
);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        config.discord.clientId as string,
        config.discord.guildId as string,
      ),
      { body: commands },
    );

    console.log("Slash commands registered successfully!");
  } catch (error) {
    console.log(error);
  }
})();

// npx ts-node src/commands/deploy-commands.ts

