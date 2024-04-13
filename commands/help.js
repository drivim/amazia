const { EmbedBuilder, Colors } = require('discord.js');
const minimist = require('minimist');

module.exports = {
	name: 'help',
	shortDescription: 'Pomoc',
	longDescription: `help - wyświetl komendy z opisami, i/bądź objaśnij`,
	async execute(message, args, client) {
		const parsed = minimist(args);

		if (parsed.help) {
			return await message.reply(this.longDescription);
		}

		if (parsed._.length === 0) {
			let out;

			globalThis.commands.forEach((commandModule) => {
				out = `${typeof out === 'string' ? out : ''}${commandModule.name} -> ${commandModule.shortDescription}\n`
			});
			
		const embed = new EmbedBuilder()
		.setColor(Colors.Green)
		.setTitle('Pomoc')
		.setDescription(`${out}`);

			return await message.reply({ embeds: [embed] });
		} else {
			let out = 'not [yet] implemented';
			return await message.reply(out);
		}
	}
}

