const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("Pong!")
            .setDescription(`Ping: ${interaction.client.ws.ping}`)
            .setColor(0xfff)

        await interaction.reply({embeds: [embed]})
    }
}