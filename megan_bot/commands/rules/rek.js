const {SlashCommandBuilder,
    PermissionsBitField,
    EmbedBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder, time
} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Send message into #news")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDMPermission(false),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setTitle('Create message')
            .setCustomId('meganMessageModal')

        const titleInput = new TextInputBuilder()
            .setCustomId("titleInput")
            .setLabel("Print title")
            .setPlaceholder("Enter the title...")
            .setStyle(TextInputStyle.Short)
            .setMinLength(10)
            .setRequired(true)

        const bodyInput = new TextInputBuilder()
            .setCustomId("bodyInput")
            .setLabel("Print body text")
            .setPlaceholder("Enter the text...")
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(10)
            .setRequired(true)

        const urlInput = new TextInputBuilder()
            .setCustomId("urlInput")
            .setLabel("Enter url")
            .setPlaceholder("Enter the text...")
            .setStyle(TextInputStyle.Short)
            .setMinLength(3)
            .setRequired(true)

        const row1 = new ActionRowBuilder().addComponents(titleInput)
        const row2 = new ActionRowBuilder().addComponents(bodyInput)
        const row3 = new ActionRowBuilder().addComponents(urlInput)

        modal.addComponents(row1, row2, row3)

        await interaction.showModal(modal)

        const filter = (interaction) => interaction.customId === 'meganMessageModal'

        await interaction.awaitModalSubmit({filter, time: 30_000})
            .then((modalInteraction) => {
                const body = modalInteraction.fields.getTextInputValue("bodyInput")
                const title = modalInteraction.fields.getTextInputValue("titleInput")
                const url = modalInteraction.fields.getTextInputValue("urlInput")
                const channel = modalInteraction.guild.channels.cache.get('1140187214320521317');

                const embed = new EmbedBuilder()
                    .setColor(0x611508)
                    .setTitle(title)
                    .setDescription(body)
                    .addFields(
                        {name: "Ссылка", value: url}
                    )

                channel.send({embeds: [embed]})

                // modalInteraction.reply({content: "Modal success submitted", ephemeral: true})

                console.log("Modal submitted")
                // console.log("UP")
            })
            .catch((err) => {
                console.log(`Error: ${err}`)
            })
    }
}