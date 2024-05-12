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

}

export const handleLogin = async (interaction: ChatInputCommandInteraction) => {

}

export const handleGetProfile = async (interaction: ChatInputCommandInteraction) => {

}

export const handleRefresh = async (interaction: ChatInputCommandInteraction) => {

}
