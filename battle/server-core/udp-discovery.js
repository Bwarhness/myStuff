var exports = module.exports;
var diont = require('diont')();
var ip = require('ip');

const service = {
    name: "socketIO",
    host: ip.address(), // when omitted, defaults to the local IP
    port: 3000
    // any additional information is allowed and will be propagated
};

exports.annouceService = () => {
    diont.announceService(service);
}
exports.renounceServioce = () => {
    diont.renounceService(service);
}