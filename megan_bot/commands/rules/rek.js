const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rek")
        .setDescription("-")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDMPermission(false),
    async execute(interaction) {

    }
}