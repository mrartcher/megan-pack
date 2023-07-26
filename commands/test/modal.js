const { SlashCommandBuilder, Events } = require("discord.js");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Test modal"),
    async execute (interaction) {
        client.on(Events.InteractionCreate, async interaction =>{
            if (interaction.commandName === "modal") {
                const modal = new ModalBuilder()
                    .setCustomId("testModal")
                    .setTitle("Test modal")
                const text = new TextInputBuilder()
                    .setCustomId("textTest")
                    .setLabel("Test")
                    .setPlaceholder("Enter text...")
                    .setStyle(TextInputStyle.Short)
                const textInput = new ActionRowBuilder().addComponents(text);
                modal.addComponents(textInput);
                await interaction.showModal(modal);
        
                client.on(Events.InteractionCreate, async interaction =>{
                    if (!interaction.isModalSubmit()) return;
                    
                    if (interaction.customId === "testModal") {
                        const text = interaction.fields.getTextInputValue('textTest')
                        await interaction.reply({ content: text })
                    }
                });
            }
        });
    }
}