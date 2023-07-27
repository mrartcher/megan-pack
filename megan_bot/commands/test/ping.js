const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("Pong!")
            .setDescription(`Ping: ${interaction.client.ws.ping}`)
            .setColor(0x611508)

        await interaction.reply({embeds: [embed]})
    }
}