var diont = require('diont')();
let client = require('./client-features/sound')
let point = require('./client-features/points')
let shield = require('./client-features/shield')
const electron = require('./client-core/overlay/overlay');


// ======
// UDP Annoucement
// ======
connectSocketIO('62.44.135.225', 3000)

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


// ======
// Socket connection
// ======
function connectSocketIO(ip, port){
    const socket = require('socket.io-client')(`http://${ip}:${port}`);
    
    socket.on('connect', function(){
        console.log("person connected")
    });
    socket.on('disconnect', function(){
        console.log("person disconnected")
    });
    electron.startOverlay(socket);
    require('./client-features/key').setIOListeners(socket);
    require('./client-features/html/effect-overlay').setIOListeners(socket);
}

