var exports = module.exports;

// ======
// Globals
// ======
let _points = 0;



// ======
// Basic method
// ======
exports.getPoints = () => {return _points};
exports.setPoints = pointsToSet => _points = pointsToSet;
exports.addPoints = pointsToAdd => this.setPoints(_points + pointsToAdd);
exports.removePoints = pointsToRemove => {
    const currentPoints = this.getPoints();
    let pointsToBe = currentPoints - pointsToRemove;
}

//increase points.
setInterval(() => {
    this.addPoints(10);
    console.log(_points);
}, 1000);