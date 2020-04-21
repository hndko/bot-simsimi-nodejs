// Bot SimSimi - Kyuoko

var request = require("request");
const readline = require("readline");

// banner
console.log('|--------------------------------|');
console.log('| Simple Bot SimSimi Request Api |');
console.log('|--------------------------------|');
console.log('| Author  : Kyuoko               |');
console.log('| Code    : NodeJS               |');
console.log('| Youtube : Local Heart          |');
console.log('| Api Trial Limit Request 100    |');
console.log('|--------------------------------|');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '|[~] Saya : ',
	});

function simi() {
	rl.prompt();
	rl.on('line', function(answer){
		request.post('https://wsapi.simsimi.com/190410/talk',{
			headers:{
				'x-api-key': '9tNz4BeGLys8GzFhbAh8zFZB8ga1K16JQM4zCErM', 
				'Content-Type':'application/json'
			},
			body:{
				utext: answer, lang: 'id'
			},
			json: true
		},
		function (error, headers, body){
			if (error) return console.error(error);
			console.log('|[!] Simi :',body['atext']);
			rl.prompt();
		});
	});
}

simi();