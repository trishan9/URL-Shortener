import { Client, Events, GatewayIntentBits, Message } from "discord.js"
import express, { Express } from "express";

import config from "./config";
import { handleCreate, handleGetProfile, handleLogin, handleRefresh, handleRegister } from "./commands/handlers";
import type { Commands } from "./commands/commands";

const app: Express = express();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    app.listen(config.app.port, () => console.log("Up and running!"));
});

client.on(Events.MessageCreate, (message: Message<boolean>) => {
    if (message.author.bot) return;
    message.reply({
        content: `Hello, ${message.author.username}!`
    })
})

client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName as Commands) {
        case "ping":
            interaction.reply({
                content: "Pong Pong!"
            })
            break;
        case "create":
            handleCreate(interaction);
            break;
        case "register":
            handleRegister(interaction);
            break;
        case "login":
            handleLogin(interaction);
            break;
        case "profile":
            handleGetProfile(interaction);
            break;
        case "refresh":
            handleRefresh(interaction);
            break;
        default:
            interaction.reply({
                content: "Unknown command!"
            })
    }
})

client.login(config.discord.botToken)