module.exports = {
	name: 'glosowanie',
	shortDescription: 'Wyślij głosowanie na kanał głosowań',
	longDescription: `Jak masz uprawniena, możesz tą komendą wysłać głosowanie na skonfigurowany kanał głosowań.`,
	async execute(message, args, client) {
		if (!message.member.roles.cache.some((role) => config.announcements.allowedRoleId.includes(role.id))) {
			return message.reply('not applicable');
		}

		const voteDetails = args.join(' ');

		const channel = message.guild.channels.cache.get(config.voting.channelId);

		const msg = await channel.send(`Głosowanie!\n${voteDetails}\n😄 - Tak\n😐 - Nie wiem\n🙁 - Nie\n||@everyone||\nGłosowanie zlecone przez <@${message.author.id}>`);

		await msg.react('😄');
		await msg.react('😐');
		await msg.react('🙁');

		return await message.reply(`OK: https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id}`);
	}
}
