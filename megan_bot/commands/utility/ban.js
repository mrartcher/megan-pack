const { SlashCommandBuilder, EmbedBuilder, embedLength } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban member")
        .addUserOption(op => op
            .setName("user")
            .setDescription("User to ban")
            .setRequired(true))
        .addStringOption(op => op
            .setName("reason")
            .setDescription("Reason to ban")
            .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser("user")
        const reason = interaction.options.getString("reason")

        const embedS = new EmbedBuilder()
            .setTitle("Baned")
            .setDescription(`User: ${user} has been baned for reason: ${reason}!`)
            .setColor(0x611508)
        
        const embedL = new EmbedBuilder()
            .setTitle("User baned")
            .setDescription(`User: ${user}, reason: ${reason}`)
            .setColor(0x611508)
        
        await interaction.reply({embeds: [embedS]})

        const chanel = interaction.channels.cache.get('1134204456175681776');
        chanel.send({embeds: [embedL]})
    }
}