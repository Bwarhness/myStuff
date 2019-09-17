var diont = require('diont')();
let client = require('./client-features/sound')
let point = require('./client-features/points')
let shield = require('./client-features/shield')



// ======
// UDP Annoucement
// ======
diont.on("serviceAnnounced", function(serviceInfo) {
	// A service was announced
	// This function triggers for services not yet available in diont.getServiceInfos()
	// serviceInfo is an Object { isOurService : Boolean, service: Object }
	// service.name, service.host and service.port are always filled
    console.log("A new service was announced", serviceInfo.service);
    if (serviceInfo.service.name === 'socketIO') {
        connectSocketIO(serviceInfo.service.host, serviceInfo.service.port)
    }
});
// diont.on("serviceRenounced", function(serviceInfo) {
// 	console.log("A service was renounced", serviceInfo.service);
// 	console.log("All known services", diont.getServiceInfos());
// });

// ======
// Socket connection
// ======
function connectSocketIO(ip, port){
    const socket = require('socket.io-client')(`http://${ip}:${port}`);
    socket.on('connect', function(){});
    socket.on('event', function(data){});
    socket.on('disconnect', function(){});
    let key = require('./client-features/key')
    key.setIOListeners(socket);
}
