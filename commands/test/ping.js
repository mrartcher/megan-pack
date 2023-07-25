const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replays with Pong!"),
	async execute(interaction) {
        const embed = new EmbedBuilder()
        .setColor(0x06D551)
        .setTitle("Pong!")
        .setDescription(`Ping: ${interaction.client.ws.ping}ms`)
		await interaction.reply('pong');
	}
}