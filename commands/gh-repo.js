const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
  name: 'gh-repo',
  shortDescription: 'Wysyła żadanie do githuba o informacje dotyczące danego repozytorium',
  longDescription: 'Wysyła żadanie do githuba o informacje dotyczące danego repozytorium',
  async execute(message, args) { 
      const lookup = args.join(' ');
  const gh = await fetch(`https://api.github.com/repos/${lookup}`);
      const result = await gh.json();
      const { name, full_name, description, language, owner, created_at, updated_at } = result;

		const embed = new EmbedBuilder()
		.setColor(Colors.Green)
		.setTitle('Informacje o repozytorium GitHub')
		.setDescription(`Właściciel Repozytorium: ${owner.login}\nPełna nazwa repozytorium: ${full_name}\nNazwa repozytorium: ${name}\nOpis repozytorium: ${description}\nJęzyk Programowania: ${language}\nData utworzenia: ${created_at}\nData ostatniej zmiany: ${updated_at}`);

  message.reply({ embeds: [embed] });
      }
  }