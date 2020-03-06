var app;
var http;
let io;
let _clients = [];

var exports = module.exports;
exports.initSocket = () => {
    app = require('express')();
    http = require('http').createServer(app);
    io = require('socket.io')(http);
    io.on('connection', (socket) => {
        _clients.push(socket);
        console.log('a user connected');     
        console.log(_clients)
        socket.on('attack', typeOfAttack => {
            console.log(typeOfAttack)
            io.emit('attack', typeOfAttack)
        })
        socket.on('getClients', clientId => {
            if (clientId) {
                socket.emit(this.getClient(clientId))
            } else {
                socket.emit(this.getClients())
            }
        })
    });


    http.listen(3000, function () {
        console.log('listening on *:3000');
    });
}
exports.broadcast = (event, param) => io.emit(event,param);
exports.emitToClient = (clientId, event, param) => this.getClient(client).emit(event, param);
exports.getClients = () => _clients;
exports.getClient = clientId => _clients.find(p => p.id == id);
