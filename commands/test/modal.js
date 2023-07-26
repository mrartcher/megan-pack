const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Test modal"),
    async execute (interaction) {
        // some code
    }
}