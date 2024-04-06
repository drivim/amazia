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

			return await message.reply(out);
		} else {
			let out = 'not [yet] implemented';

			return await message.reply(out);
		}
	}
}

