const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify")
        .setDescription("Verification for new users. Send command to verify")
        .setDMPermission(false),
    async execute(interaction) {
        const btn = new ButtonBuilder()
            .setCustomId("verBTN")
            .setLabel("Verify")
            .setEmoji('✅')
            .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents(btn)

        const embed = new EmbedBuilder()
            .setTitle("Верификация")
            .setDescription("Для верификации нажми на кнопку ниже (она одноразовая).")
            .setColor(0x611508)

        const response = await interaction.reply({components: [row], ephemeral: true, embeds: [embed]})

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const verifyc = await response.awaitMessageComponent({ filter: collectorFilter});

            if (verifyc.customId === 'verBTN') {
                const user = verifyc.user
                const random = Math.floor((Math.random() * 1000) + 1);

                const modal = new ModalBuilder()
                    .setCustomId("verMd")
                    .setTitle("Verify")

                const numbInput = new TextInputBuilder()
                    .setCustomId("numbInput")
                    .setLabel(`Введите число отображонное на екране: ${random}`)
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder("Вводить сюда...")
                    .setRequired(true)

                const row = new ActionRowBuilder().addComponents(numbInput)

                modal.addComponents(row)
                verifyc.showModal(modal)

                const filter = (verifyc) => verifyc.customId === "verMd"

                await verifyc.awaitModalSubmit({filter: filter, time: 30_000})
                    .then((md) => {
                        console.log("DETECT")
                        const input = md.fields.getTextInputValue("numbInput")
                        const role = md.guild.roles.cache.get("1130828643837427722")
                        const member = verifyc.guild.members.cache.get(user.id);

                        if (input == random) {

                            if (!member.roles.cache.some(role => role.id === '1130828643837427722')) {
                                const embed = new EmbedBuilder()
                                    .setTitle("Успешная верификация")
                                    .setDescription(`${user}, ти успешно прошел проверку!`)
                                    .setColor(0x611508)

                                md.reply({embeds: [embed], ephemeral: true})

                                member.roles.add(role)
                            } else {
                                const embed = new EmbedBuilder()
                                    .setTitle("Не удалось верифицировать")
                                    .setDescription(`${user}, у тебя уже есть ета роль.`)
                                    .setColor(0x611508)

                                md.reply({embeds: [embed], ephemeral: true})
                            }
                        } else {
                            const embed = new EmbedBuilder()
                                .setTitle("Вы не прошли верификацию")
                                .setDescription(`${user}, ти не успешно прошел проверку!`)
                                .setColor(0x611508)

                            md.reply({embeds: [embed], ephemeral: true})
                        }
                    })
            }
        } catch (e) {
            console.log(e)
        }
    }
}