

var diont = require('diont')();
var ip = require('ip');


// ======
// Announce our own service
// ======
var service = {
	name: "socketIO",
	host: ip.address(), // when omitted, defaults to the local IP
	port: 3000
	// any additional information is allowed and will be propagated
};
diont.announceService(service);




// ======
// SOCKET IO
// ======


var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});