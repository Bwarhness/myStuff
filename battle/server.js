let udpDiscorver = require('./server-core/udp-discovery')
let socket = require('./server-core/socket')

// ======
// TEST CODE
// ======
function doSomethingRandom(){
	console.log('doing random');
	socket.broadcast('key', 'f')
}
setInterval(() => {
	// doSomethingRandom()
}, 1000);

// ======
// SOCKET IO
// ======
socket.initSocket();
// ======
// Announce our own service
// ======
udpDiscorver.annouceService();


