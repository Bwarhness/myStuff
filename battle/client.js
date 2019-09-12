var diont = require('diont')();
let client = require('./client-features/sound')
let socket;




diont.on("serviceAnnounced", function(serviceInfo) {
	// A service was announced
	// This function triggers for services not yet available in diont.getServiceInfos()
	// serviceInfo is an Object { isOurService : Boolean, service: Object }
	// service.name, service.host and service.port are always filled
    console.log("A new service was announced", serviceInfo.service);
    if (serviceInfo.service.name === 'socketIO') {
        console.log('uau');
        connectSocketIO(serviceInfo.service.host, serviceInfo.service.port)

    }
	// List currently known services
	console.log("All known services", diont.getServiceInfos());
});

diont.on("serviceRenounced", function(serviceInfo) {
	console.log("A service was renounced", serviceInfo.service);
	console.log("All known services", diont.getServiceInfos());
});




function connectSocketIO(ip, port){
    socket = require('socket.io-client')(`http://${ip}:${port}`);
    socket.on('connect', function(){});
    socket.on('event', function(data){});
    socket.on('disconnect', function(){});
}




