module.exports = {
	name: 'reload',
	shortDescription: 'Przeładowywanie bota',
	longDescription: `Przeładowywanie event'ów i komend`,
	async execute(message, args, client) {
		const eventCount = globalThis.reloadEvents();
		const commandCount = globalThis.commandsReload();
		globalThis.config = require('../config.json');

		const embed = {
			title: 'Reload',
			description: `✅ OK: ${eventCount} event'ów i ${commandCount} komend`
		}

		return message.reply({
			embeds: [
				embed
			]
		});
	}
}

