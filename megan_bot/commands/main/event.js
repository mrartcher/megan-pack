const {ButtonStyle, SlashCommandBuilder, PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder,
    EmbedBuilder, ButtonBuilder
} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("event")
        .setDescription("Create the custom event")
        .addStringOption(op => op
            .setName("type")
            .setDescription("Type of the event")
            .setRequired(true)
            .addChoices(
                {name: "NSFW", value: "nsfw_role"},
                {name: "Arctic event", value: "arctic_role"},
                {name: "Default", value: "def_role"}
            ))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {
        const category = interaction.options.getString("type")

        if (category === "def_role") {

        } else if (category === "nsfw_role") {

        } else if (category === "arctic_role") {

        }
    }
}