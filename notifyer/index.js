const notifier = require('node-notifier');
const fs = require('fs')
const readlineSync = require('readline-sync');
const program = require('commander');
program
	.option('-d, --debug', 'output extra debugging')
  	.option('-a, --add <title>', 'add task')

program.parse(process.argv);
if (program.opts()) {
	if (program.add) {
		createNewFromTerminal(program.add)
	};
	if (program.debug) console.log(program.opts());
} else {
	writeStuff('quaterHourly');
	setInterval(()=> {
		writeStuff('quaterHourly');
	}, 1000*60*15)
	writeStuff('halfHourly');
	setInterval(()=> {
		writeStuff('halfHourly');
	}, 1000*60*30)
	
	writeStuff('hourly');
	setInterval(()=> {
		writeStuff('hourly');
	}, 1000*60*60)
}











function createNewFromTerminal(title, text){
	if (!text) {
		text = readlineSync.question('Tekst til opgaven');
	}
	const newAssignment = {
		title:title
	}
	let json = getJson();
	json.halfHourly.push(newAssignment)
	setJson(json);
}
function getJson(){
 return JSON.parse(fs.readFileSync('notice.json', 'utf8'))
}
function setJson(json){
	let data = JSON.stringify(json);
	fs.writeFileSync('notice.json', data, 'utf8');
}
function writeStuff(val){
	let data = getJson();
	if (data[val]){
		data[val].forEach((item)=> {
		notifier.notify({message: item.text, open: item.link, title:item.title});
	})
	}
}