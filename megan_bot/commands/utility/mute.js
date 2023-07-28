const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute the member")
        .addUserOption(op => op
            .setName("user")
            .setDescription("User to mute")
            .setRequired(true))
        .addIntegerOption(op => op
            .setName("time")
            .setDescription("Time to mute ( in minutes )")
            .setRequired(true))
        .addStringOption(op => op
            .setName("reason")
            .setDescription("Reason to mute")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const user = interaction.options.getMember("user")
        const time = interaction.options.getInteger("time")
        const reason = interaction.options.getString("reason")
        const chanel = interaction.guild.channels.cache.get('1134204456175681776');

        const timeoutT = time * 60000

        const embedS = new EmbedBuilder()
            .setTitle("Muted")
            .setDescription(`User: ${user} has been muted for reason: ${reason}!`)
            .setColor(0x611508)

        const embedL = new EmbedBuilder()
            .setTitle("User muted")
            .setDescription(`User: ${user}, reason: ${reason}, time ${time} minute`)
            .setColor(0x611508)

        await interaction.reply({embeds: [embedS]})

        chanel.send({embeds: [embedL]})
        user.timeout(timeoutT)
    }
}