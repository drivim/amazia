const path = require('node:path');
const fs = require('node:fs');

const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');

globalThis.config = require('./config.json');
dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
});
globalThis.client = client;

// magic event loading
// oh shit
globalThis.reloadEvents = () => {
	// Yep, remove all events.
	client.removeAllListeners();

	// scan config.directories.eventsDir, filtering everything that doesn't end with .js
	const eventsDir = fs.readdirSync(config.directories.eventsDir).filter((fileName) => fileName.endsWith('.js'));
	let eventCount = 0;

	console.log('Eventy:');

	// pętla przez eventsDir (Array)
	for (let i = 0; i < eventsDir.length; i += 1) {
		// Join the current working directory with
		// configured event directory location and
		// with the event module
		const eventModulePath = path.join(process.cwd(), config.directories.eventsDir, eventsDir[i]);

		// Remove event module from cache if loaded
		delete require.cache[require.resolve(eventModulePath)];

		// Load the event module
		const eventModule = require(eventModulePath);

		// check if:
		// type of name provided by the event module is a string
		// OR
		// type of execute provided by the event module is a function
		//
		// If one of the arguments aren't 
		if (typeof eventModule.name !== 'string' || typeof eventModule.execute !== 'function') {
			console.error(`${eventModulePath} is not a valid event module`);
			// Stop the loop
			break;
		}

		// Register the event
		client.on(eventModule.name, eventModule.execute);

		console.log(`\t${eventModulePath} -> ${eventModule.name}`);
		eventCount += 1;
	}

	return eventCount;
}

globalThis.reloadEvents();

client.login(process.env.DISCORD_BOT_TOKEN);

