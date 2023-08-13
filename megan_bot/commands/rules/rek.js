const {SlashCommandBuilder,
    PermissionsBitField,
    EmbedBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Send message into #news")
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDMPermission(false),
    async execute(interaction) {

        const messageModal = new ModalBuilder()
            .setTitle('Create message')
            .setCustomId('msdModal')

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

        const row = new ActionRowBuilder().addComponents(titleInput)
        const row1 = new ActionRowBuilder().addComponents(bodyInput)

        messageModal.addComponents(row, row1)

        await interaction.showModal(messageModal)

        const filter = (interaction) => interaction.customId === 'msdModal'

        await interaction.awaitModalSubmit({filter, time: 60_000})
            .then((modalInteraction) => {
                const title = modalInteraction.fields.getTextInputValue("titleInput")
                const body = modalInteraction.fields.getTextInputValue("bodyInput")
                const channel = modalInteraction.guild.channels.cache.get('1134408862494109728');

                const embed = new EmbedBuilder()
                    .setColor(0x611508)
                    .setTitle(title)
                    .setDescription(body)

                channel.send({content: "@everyone"})
                channel.send({embeds: [embed]})

                modalInteraction.reply({content: "Modal success submitted", ephemeral: true})

                console.log("Modal submitted")
                // console.log("UP")
            })
            .catch((err) => {
                console.log(`Error: ${err}`)
            })
    }
}