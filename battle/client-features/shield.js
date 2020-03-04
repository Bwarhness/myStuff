var exports = module.exports;

// ======
// Globals
// ======
let _shield = 0;


// ======
// Basic method
// ======
exports.getShield = () => {return _shield};
exports.setShield = shieldToSet => _shield = shieldToSet;
exports.addShield = shieldToAdd => this.setShield(_shield + shieldToAdd);
exports.removeShield = shieldToRemove => {
    const currentShield = this.getShield();
    let pointsToBe = currentShield - shieldToRemove;
    this.setShield(pointsToBe);
}