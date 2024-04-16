const { WebhookClient } = require('discord.js');

const webhook = new WebhookClient({
	// url: `https://canary.discord.com/api/webhooks/${config.announcements.webhookId}/${config.announcements.webhookToken}`
	id: `${config.announcements.webhookId}`,
	token: `${config.announcements.webhookToken}`,
});

module.exports = {
	name: 'ogloszenie',
	shortDescription: 'Wyślij ogłoszenie na kanał ogłoszeń',
	longDescription: `Jak masz uprawniena, możesz tą komendą wysłać ogłoszenia na skonfigurowany kanał ogłoszeń.`,
	async execute(message, args, client) {
		if (!message.member.roles.cache.some((role) => config.announcements.allowedRoleId.includes(role.id))) {
			return message.reply('not applicable');
		}
// My errors show that i shouldn't be working on this bot alone
		const annoucement = args.join(' ');

		const msg = await webhook.send(`${annoucement}\n||@everyone||`);

		return await message.reply(`OK: https://discord.com/channels/${config.guildId}/${msg.channel_id}/${msg.id}`);
	}
}

