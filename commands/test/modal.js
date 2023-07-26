const { SlashCommandBuilder } = require("discord.js");
import client from "../../index";

module.exports = {
    data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Test modal"),
    async execute (interaction) {
        // some code
    }
}