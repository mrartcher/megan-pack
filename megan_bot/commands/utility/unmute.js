const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Unmute the member")
        .addUserOption(op => op
            .setName("user")
            .setDescription("User to un mute")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const user = interaction.options.getMember("user")
        const chanel = interaction.guild.channels.cache.get('1134204456175681776');

        const embedS = new EmbedBuilder()
            .setTitle("Un muted")
            .setDescription(`User: ${user} has been un muted!`)
            .setColor(0x611508)

        const embedL = new EmbedBuilder()
            .setTitle("User un muted")
            .setDescription(`User: ${user}`)
            .setColor(0x611508)

        await interaction.reply({embeds: [embedS]})

        chanel.send({embeds: [embedL]})
        user.timeout(null)
    }
}