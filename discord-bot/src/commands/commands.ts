import { ApplicationCommandOptionType } from "discord.js";

export type Commands = "ping" | "create" | "register" | "login" | "profile" | "refresh";

interface ICommand {
    name: Commands;
    description: string;
    options?: ICommandOption[];
}

interface ICommandOption {
    name: string;
    description: string;
    type: any;
    choices?: ICommandChoice[];
    required: boolean;
}

interface ICommandChoice {
    name: string;
    value: string;
}

const commands: ICommand[] = [
    {
        name: "ping",
        description: "Replies with pong!"
    },
    {
        name: "register",
        description: "Create an account to use URL Shortener",
        options: [
            {
                name: "name",
                description: "Name of the user",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "email",
                description: "Email of the user",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "password",
                description: "Strong password",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    {
        name: "login",
        description: "Login to use URL Shortener",
        options: [
            {
                name: "email",
                description: "Email of the user",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "password",
                description: "Password of the user",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    {
        name: "profile",
        description: "View your profile",
        options: [
            {
                name: "access-token",
                description: "Access token to access the profile",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    },
    {
        name: "refresh",
        description: "Generate new access token using refresh token",
        options: [
            {
                name: "refresh-token",
                description: "Refresh token to generate new access token",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    },
    {
        name: "create",
        description: "Generates short URL for the given link",
        options: [
            {
                name: "original-url",
                description: "URL to be shortened",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "access-token",
                description: "Access token that you get after login",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    }
]

export default commands;