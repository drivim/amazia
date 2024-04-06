module.exports = {
	name: 'httpcat',
	shortDescription: 'zdjęcia kotów http',
	longDescription: 'Zdjęcia kotów według kodów standardu HTTP',
	async execute(message, args, client) {
		switch (args[0]) {
		case '0':
		case '100':
		case '101':
		case '102':
		case '103':
		case '200':
		case '201':
		case '202':
		case '203':
		case '204':
		case '205':
		case '206':
		case '207':
		case '208':
		case '226':
		case '300':
		case '301':
		case '302':
		case '303':
		case '304':
		case '305':
		case '307':
		case '308':
		case '400':
		case '401':
		case '402':
		case '403':
		case '404':
		case '405':
		case '406':
		case '407':
		case '408':
		case '409':
		case '410':
		case '411':
		case '412':
		case '413':
		case '414':
		case '415':
		case '416':
		case '417':
		case '418':
		case '420':
		case '421':
		case '422':
		case '423':
		case '424':
		case '425':
		case '426':
		case '428':
		case '429':
		case '431':
		case '444':
		case '450':
		case '451':
		case '497':
		case '498':
		case '499':
		case '500':
		case '501':
		case '502':
		case '503':
		case '504':
		case '505':
		case '506':
		case '507':
		case '508':
		case '509':
		case '510':
		case '511':
		case '521':
		case '522':
		case '523':
		case '525':
		case '530':
		case '599':
			return message.channel.send({
				content: `https://http.cat/${args[0]}`
			});
		default:
			return message.channel.send({
				content: 'https://http.cat/404'
			});
		}
	}
}
