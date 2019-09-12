const notifier = require('node-notifier');
const fs = require('fs')
function getJson(){
 return JSON.parse(fs.readFileSync('notice.json', 'utf8'))
}
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


function writeStuff(val){
	let data = getJson();
	if (data[val]){
		data[val].forEach((item)=> {
		notifier.notify({message: item.text, open: item.link, title:item.title});
	})
	}
}