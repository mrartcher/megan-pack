const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits, Embed, Component, ComponentType } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vacancys")
        .setDescription("Send vacancys")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x767676)
            .setTitle("Открытия вакансий")
            .setDescription("Нажмите на кнопку ниже для открытия вакансии")

        const helper = new ButtonBuilder()
            .setCustomId("helperVacancyOpen")
            .setStyle(ButtonStyle.Success)
            .setLabel("Отурыть вакансии на пост хелпера")
            
        const row = new ActionRowBuilder()
            .addComponents(helper)

        const reply = await interaction.reply({embeds: [embed], components: [row], ephemeral: true})

        const collector = reply.createMessageComponentCollector({
            components: ComponentType.Button,
        })
        collector.on('collect', (interaction) => {
            if (interaction.customId === "helperVacancyOpen") {
                interaction.reply({content: "1", ephemeral: true})
            }
        })
    }
}