const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActivityType,
	EmbedBuilder
} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on('ready', () =>{
	client.user.setStatus('idle');
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

	if (interaction.commandName === "rek") {

		const modal = new ModalBuilder()
			.setTitle("Create reklama")
			.setCustomId('rek-modal')

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

		const rows = new ActionRowBuilder().addComponents(titleInput, bodyInput, urlInput)

		modal.addComponents(rows)

		await interaction.showModal(modal)
	}

	if (interaction.customId === "rek-modal") {

		const body = interaction.fields.getTextInputValue("bodyInput")
		const title = interaction.fields.getTextInputValue("titleInput")
		const url = interaction.fields.getTextInputValue("urlInput")
		const channel = interaction.guild.channels.cache.get('1134408862494109728');

		const embed = new EmbedBuilder()
			.setColor(0x611508)
			.setTitle(title)
			.setDescription(body)
			.addFields(
				{name: "Ссылка", value: url}
			)

		channel.send({embeds: [embed]})
	}
});

client.login(token);