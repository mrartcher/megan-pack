const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Unmute the member")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const url = 'https://discord.gg/XhNQG4B9'
        const chanell = interaction.guild.channels.cache.get('1134408862494109728');

        const embed = new EmbedBuilder()
            .setTitle("Топовый гриферский сервер")
            .setDescription("DarkGrief - сервер гриферского выжывания с отзывчивой администрацией")
            .addFields(
                {name: "Ссылка", value: url}
            )

        chanell.send({embeds: [embed]})
    }
}