module.exports = {
	name: 'ping',
	shortDescription: 'Ping bota do bramki discorda',
	longDescription: `ping - Ping bota do bramki discorda`,
	async execute(message, args, client) {
		return await message.channel.send({
			embeds: [
				{
					title: 'Pong!',
					description: `Ping: ${client.ws.ping}ms`
				}
			]
		});
	}
}

