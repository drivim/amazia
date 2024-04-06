const util = require('node:util');

module.exports = {
	name: 'eval',
	shortDescription: 'eval',
	longDescription: 'not applicable',
	async execute(message, args, client) {
		if (!config.allowedDevelopmentUsers.includes(message.author.id)) {
			return await message.reply('not allowed ^-^');
		}

		const code = args.join(' ');

		let error = false;
		let out;

		try {
			out = await eval(code);
		} catch (e) {
			error = true;
			out = `${e}`;
		}

		return await message.reply({
			embeds: [
				{
					title: 'eval',
					description: util.format(out),
					color: error ? 0xC70000 : 0x00C700
				}
			]
		});
	}
}

