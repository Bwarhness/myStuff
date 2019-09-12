var exports = module.exports = {};

exports.playsound = (link) => {
    player.play('test.wav', function (err) {
        if (err) throw err
    })
}   