import { ChatInputCommandInteraction } from "discord.js";
import axios from "axios";

import { API_ENDPOINTS } from "./constants";
import config from "@/config";

export const handleCreate = async (interaction: ChatInputCommandInteraction) => {
    const url = interaction.options.get("original-url")?.value as string;
    const accessToken = interaction.options.get("access-token")?.value as string;

    try {
        const response = await axios.post(API_ENDPOINTS["CREATE_SHORT_URL"] as string, {
            redirectUrl: url
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return interaction.reply({
            content: `Here's your Shortened URL: ${config.api.url}/${response?.data?.data?.shortenedId}`
        })
    } catch (err: any) {
        return interaction.reply({
            content: err?.response?.data?.message || "Failed to shorten the URL. Please try again later.",
        })
    }
}

export const handleRegister = async (interaction: ChatInputCommandInteraction) => {
    const name = interaction.options.get("name")?.value as string;
    const email = interaction.options.get("email")?.value as string;
    const password = interaction.options.get("password")?.value as string;

    try {
        const response = await axios.post(API_ENDPOINTS["REGISTER_URL"], {
            name,
            email,
            password
        })
        return interaction.reply({
            content: `
            @${interaction.user.username}\nSuccessfully registered!\n\nHere's your details: \`\`\`\n${JSON.stringify(response?.data?.data)}\`\`\``,
        })
    } catch (err: any) {
        return interaction.reply({
            content: err?.response?.data?.message || "Failed to register. Please try again later.",
        })
    }
}

export const handleLogin = async (interaction: ChatInputCommandInteraction) => {
    const email = interaction.options.get("email")?.value as string;
    const password = interaction.options.get("password")?.value as string;

    try {
        const response = await axios.post(API_ENDPOINTS["LOGIN_URL"], {
            email,
            password
        })
        return interaction.reply({
            content: `
            @${interaction.user.username}\nSuccessfully logged in !\n\nHere's your **access token**: \`\`\`\n${response?.data?.data?.accessToken}\`\`\`\nHere's your ** refresh token **: \`\`\`\n${response?.data?.data?.refreshToken}\`\`\``,
        })
    } catch (err: any) {
        return interaction.reply({
            content: err?.response?.data?.message || "Failed to login. Please try again later.",
        })
    }
}

export const handleGetProfile = async (interaction: ChatInputCommandInteraction) => {
    const accessToken = interaction.options.get("access-token")?.value as string;

    try {
        const response = await axios.get(API_ENDPOINTS["GET_ME"], {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return interaction.reply({
            content: `Here's your profile details: \`\`\`\n${JSON.stringify(response?.data?.data)}\`\`\``,
        })
    } catch (err: any) {
        return interaction.reply({
            content: err?.response?.data?.message || "Failed to login. Please try again later.",
        })
    }
}

export const handleRefresh = async (interaction: ChatInputCommandInteraction) => {
    const refreshToken = interaction.options.get("refresh-token")?.value as string;

    try {
        const response = await axios.get(API_ENDPOINTS["REFRESH"], {
            headers: {
                "x-refresh-token": refreshToken
            }
        })
        return interaction.reply({
            content: `Here's your new access token: \`\`\`\n${response?.data?.data?.accessToken}\`\`\``,
        })
    } catch (err: any) {
        return interaction.reply({
            content: err?.response?.data?.message || "Failed to refresh token. Please try again later.",
        })
    }
}
