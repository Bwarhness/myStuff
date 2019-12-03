const notifier = require('node-notifier');
const fs = require('fs')
const readlineSync = require('readline-sync');
const program = require('commander');
const NOTICE_FILE = __dirname + '/notice.json';

program
	.option('-d, --debug', 'output extra debugging')
	.option('-c, --create <title>', 'create task')
	.option('-n, --notify <notifylist>', 'shows notification of selected')
	.option('-l, --list [listvalue]', 'lists tasks')
	.option('-r, --remove <id>', 'removes task')
	.option('-m, --move <id>', 'moves task')
program.parse(process.argv);

if (program.debug) console.log(program.opts());


if (program.create) {
	create(program.create)
	return;
};

if (program.notify) {
	createNotice(program.notify);
	return;

};
if (program.list) {
	list(program.list);
	return;

};
if (program.remove) {
	remove(program.remove);
	return;

};
if (program.move) {
	move(program.move);
	return;

};


function promptForTaskGroups(callback) {
	const json = getJson();
	var inquirer = require('inquirer');
	let questions = [];
	Object.keys(json).forEach(key => {
		questions.push(key)
	});
	questions.sort((a, b) => a.localeCompare(b))
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'Select list',
				choices: questions,
			},
		])
		.then(answers => {
			callback(answers['Select list'])
		});
}
function list(listValue) {
	const json = getJson();
	if (typeof listValue == 'boolean') {
		promptForTaskGroups(list)
	} else {
		listValue = listValue.trim();
		json[listValue].forEach(task => {
			writeTask(task)
		});
	}
}
function writeTask(task){
	console.log('')
	Object.keys(task).forEach(key => {
		console.log(key," : ",task[key])
	});
	console.log('')
	console.log('-----------------------------------')

}
function create(title, text) {
	if (!text) {
		text = readlineSync.question('Tekst til opgaven: ');
	}
	const newTask = {
		id: generateId(),
		title: title,
		text: text
	}
	let json = getJson();
	
	json['todo'].push(newTask)
	setJson(json);
	writeTask(newTask)
}
function remove(id) {
	const json = getJson();
	Object.keys(json).forEach(key => {
		json[key] = json[key].filter(p => p.id !== id)
	});
	setJson(json);
}
function move(id) {
	const json = getJson();
	let taskToMove; 
	Object.keys(json).forEach(group => {
		const task = json[group].find(p => p.id === id);
		if (task) {
			taskToMove = task;
			json[group] = json[group].filter(p => p.id !== id)
		}

	});
	promptForTaskGroups((group) => {
		json[group].push(taskToMove);
		setJson(json);
	});
}
function getJson() {
	return JSON.parse(fs.readFileSync(NOTICE_FILE, 'utf8'))
}
function setJson(json) {
	let data = JSON.stringify(json);
	fs.writeFileSync(NOTICE_FILE, data, 'utf8');
}
function createNotice(val) {
	let data = getJson();
	if (data[val]) {
		data[val].forEach((item) => {
			if (!item.text) {
				item.text = item.title;
			}
			notifier.notify({ message: item.text, open: item.link, title: item.title });
		})
	}
}
function generateId() {
	var number = Math.random() // 0.9394456857981651
	number.toString(36); // '0.xtis06h6'
	var id = number.toString(36).substr(2, 4); // 'xtis06h6'
	return id;
}
function checkForId() {
	const json = getJson();
	Object.keys(json).forEach(key => {
		json[key] = json[key].map(element => {
			if (!element.id) {
				element.id = generateId();
			}
			return element;
		})
	});
	setJson(json);
};
checkForId();