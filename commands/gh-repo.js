module.exports = {
  name: 'gh-repo',
  shortDescription: 'Wysyła żadanie do githuba o informacje dotyczące danego repozytorium',
  longDescription: 'Wysyła żadanie do githuba o informacje dotyczące danego repozytorium',
  async execute(message, args) { 
      const lookup = args.join(' ');
  const gh = await fetch(`https://api.github.com/repos/${lookup}`);
      const result = await gh.json();
      const { name, full_name, description, language, owner } = result;
  message.reply(`Właściciel Repozytorium: ${owner.login}\nPełna nazwa repozytorium: ${full_name}\nNazwa repozytorium: ${name}\nOpis repozytorium: ${description}\nJęzyk Programowania: ${language}`);
      }
  }