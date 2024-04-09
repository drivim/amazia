module.exports = {
  name: 'kot',
  shortDescription: 'Wysyła losowego kota na kanale którym jesteś',
  longDescription: 'Wysyła losowego wybranego kota za pomocą some-random-api.com',
  async execute(message, args) { 
      const kot = await fetch(`https://some-random-api.com/animal/cat`);
      const result = await kot.json();
      const { image } = result;
		message.reply(image);
      }
  }