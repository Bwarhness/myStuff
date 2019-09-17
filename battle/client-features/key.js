var exports = module.exports;
var ks = require('node-key-sender');


exports.setIOListeners = (socket) => {
    socket.on('key', (val) => {
        ks.sendKey(val);
    })
}

