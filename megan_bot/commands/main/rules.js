const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rs")
        .setDescription("-")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {
        const chanell = interaction.guild.channels.cache.get('1130816969415868488')

        const embedO = new EmbedBuilder()
            .setColor(0x611508)
            .setTitle("1.1 • Каналы и текст")
            .setDescription("На сервере запрещен: оффтоп, спам, чрезмерное упоминание участников сервера, бред")
            .addFields(
                { name: 'Наказания', value: 'Мьют', inline: true },
                { name: 'Длительность', value: 'От 1 часа', inline: true }
            )

        const embedT = new EmbedBuilder()
            .setColor(0x611508)
            .setTitle("1.2 • NSFW")
            .setDescription("На нашем сервере  запрещен 18+ и шокирующий контент.\n Запрещены сообщения про наркотики или сообщение которые прямо или косвенно восхваляют суицид.")
            .addFields(
                { name: 'Наказания', value: 'Бан', inline: true },
                { name: 'Длительность', value: 'От 5 дней', inline: true }
            )
        const embedS = new EmbedBuilder()
            .setColor(0x611508)
            .setTitle("1.3 • Угрозы")
            .setDescription("На нашем сервере запрещено угрожать участникам, собирать на них информацию, шантажировать, распростронять дизинформацию способную как-то навредить участнику нашего сервера.")
            .addFields(
                { name: 'Наказания', value: 'Бан либо мьют', inline: true },
                { name: 'Длительность', value: 'От 1 часа до 30 дней', inline: true }
            )
        const embedD = new EmbedBuilder()
            .setColor(0x611508)
            .setTitle("1.4 • Общение")
            .setDescription("На сервере запрещено проявлять токсичность, оскорблять участников нашего сервера, упоминать родню, проявлять токсичность на основе религии и национальности. \nЗарещена травля, насмешки, провокации на нарушения. \nНа нашем сервере запрещены любые упоминания политики, попрошайничество. \nЗапрещено обсуждение действий администрации либо модерации.")
            .addFields(
                { name: 'Наказания', value: 'Бан', inline: true },
                { name: 'Длительность', value: 'От 5 дней', inline: true }
            )
        const embedF = new EmbedBuilder()
            .setColor(0x611508)
            .setTitle("1.5 • Реклама")
            .setDescription("На нашем сервере категорически запрещены вредоносные ссылки, файлы.")
            .addFields(
                { name: 'Наказания', value: 'Мьют', inline: true },
                { name: 'Длительность', value: 'От 2 цасов', inline: true },
                {name: 'Примичание', value: ' Разрешены ссылки только на проверенные сайты и офицыальные ресурсы проекта.'}
            )
        const embedG = new EmbedBuilder()
            .setColor(0x611508)
            .setTitle("1.6 • Профиль")
            .setDescription("На нашем сервере запрещено иметь 18+ аватарки, баннеры, никеймы. \nТак же запрещено иметь оскорбления в чью то сторону в нике или профиле. \nНик должен быть пингабельный, не иметь никакую фашистскую или нацистскую символику.")
            .addFields(
                { name: 'Наказания', value: 'Мьют', inline: true },
                { name: 'Длительность', value: 'До смены', inline: true },
            )

        chanell.send({embeds: [embedO, embedT, embedS, embedD, embedF, embedG]})

        await interaction.reply({content: "Success", ephemeral: true})
    }
}