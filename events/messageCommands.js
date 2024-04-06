const path = require('node:path');
const fs = require('node:fs');

const fuzzysort = require('fuzzysort');

// set, get etc. 
// it's a fucking Map (as in programming, not as in politics)
// but better
const { Collection } = require('discord.js');

globalThis.commands = new Collection();

globalThis.commandsReload = () => {
	// pizza time
	globalThis.commands = new Collection();
	globalThis.commandNames = [];

	console.error('\tKomendy:');

	// The same fucking ordeal.
	// Scan through the directory defined at config.directories.commandsDir,
	// and filter them if they don't end with .js
	const commandsDir = fs.readdirSync(config.directories.commandsDir).filter((fileName) => fileName.endsWith('.js'));
	let commandsCount = 0;

	// loop through commandsDir (Array)
	for (let i = 0; i < commandsDir.length; i += 1) {
		// Join the current working directory with
		// configured command directory location and
		// with the command module file name
		const commandModulePath = path.join(process.cwd(), config.directories.commandsDir, commandsDir[i]);
		// Remove command module from cache if loaded
		delete require.cache[require.resolve(commandModulePath)];

		// can you guess what comes next?

		// Yes, you guessed it!
		// Loading the fucking event module!
		const commandModule = require(commandModulePath);

		// you know what?
		// just read the event module version's comment
		// at index.js, I won't even... *sigh*
		if (typeof commandModule.name !== 'string' || typeof commandModule.execute !== 'function') {
			console.error(`${commandModulePath} is not a valid command module`);
			// Continue
			continue;
		}

		// Register the command (FINALLY)
		commands.set(commandModule.name, commandModule);

		console.log(`\t\t${commandsDir[i]} -> ${commandModule.name}`);

		globalThis.commandNames.push(commandModule.name);
		commandsCount += 1;
	}

	return commandsCount;
}

globalThis.commandsReload();

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (message.author.bot) return;

		let prefix = false;

		// loop through configured prefixes
		for (let i = 0; i < config.prefixes.length; i += 1) {
			// get configured prefix to compare message content
			// against
			const configuredPrefix = config.prefixes[i];

			if (message.content.startsWith(configuredPrefix)) {
				prefix = configuredPrefix;
				break;
			}
		}

		if (!prefix) {
			return;
		}

		const args = message.content.slice(prefix.length).trim().split(/ +/gmi);

		let commandName = args[0];

		const results = fuzzysort.go(args[0], globalThis.commandNames);

		console.error(results);

		if (/*results[0]?.score < -50 && */typeof results[0]?.score === 'number') {
			commandName = results[0].target;
		}

		const command = globalThis.commands.get(commandName);

		if (!command) {
			return;
		}

		try {
			await command.execute(message, args.slice(1), globalThis.client);
		} catch (e) {
			console.error(e);
			return await message.reply({
				content: 'błąd'
			});
		}
	}
}

