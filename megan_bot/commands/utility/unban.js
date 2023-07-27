const { SlashCommandBuilder, EmbedBuilder, embedLength } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban member")
        .addUserOption(op => op
            .setName("user")
            .setDescription("User to ban")
            .setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        const user = interaction.options.getUser("user")

        const embedS = new EmbedBuilder()
            .setTitle("Unbaned")
            .setDescription(`User: ${user} has been unbaned.`)
            .setColor(0x611508)
        
        const embedL = new EmbedBuilder()
            .setTitle("User unbaned")
            .setDescription(`User: ${user}`)
            .setColor(0x611508)
        
        await interaction.reply({embeds: [embedS]})

        const chanel = interaction.guild.channels.cache.get('1134204456175681776');
        chanel.send({embeds: [embedL]})

        await interaction.guild.members.unban(user)
    }
}