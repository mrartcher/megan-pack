const { SlashCommandBuilder, Events } = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Test modal"),
    async execute (interaction) {
        // some code
    }
}