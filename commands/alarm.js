module.exports = {
	name: 'alarm',
	shortDescription: 'alarm',
	longDescription: `alarm`,
	async execute(message, args, client) {
		if (!message.member.roles.cache.some((role) => config.allowedAlarmRoles.includes(role.id))) return;
		
		const mesg = await message.reply('Fetching members...');

		await message.guild.members.fetch();

		await mesg.edit('Kicking fucker...');

		const fucker = await message.guild.members.cache.get(config.alarmTargetId);

		await fucker.kick({
			reason: 'Typ kicka: Ochrona Anty-Leak'
		});

		return message.reply('OK');
	}
}

