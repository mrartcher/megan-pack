const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("modal")
        .setDescription("Test modal"),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId("testModal")
            .setTitle("Test modal")
        const text = new TextInputBuilder()
            .setCustomId("textTest")
            .setLabel("Test")
            .setPlaceholder("Enter text...")
            .setStyle(TextInputStyle.Short)
        const textInput = new ActionRowBuilder().addComponents(text);
        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);

        client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isModalSubmit()) return;
            if (interaction.customId === 'testModal') {
                await interaction.reply({ content: 'Your submission was received successfully!' });
            }
        });
    }
}