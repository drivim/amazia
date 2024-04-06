const childProcess = require('node:child_process');

module.exports = {
	name: 'exec',
	shortDescription: 'exec',
	longDescription: 'not applicable',
	async execute(message, args, client) {
		if (!config.allowedDevelopmentUsers.includes(message.author.id)) {
			return await message.reply('not allowed ^-^');
		}

		const command = args.join(' ');

		childProcess.exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(error);
				return message.reply('error');
			}
			return message.reply(stdout);
		});
	}
}

