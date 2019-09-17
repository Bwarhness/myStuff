var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var canvas = document.getElementById('burn');
var ctx = canvas.getContext('2d');
var Particle = /** @class */ (function () {
    function Particle(ctx, origX, origY) {
        this.ctx = ctx;
        this.origX = origX;
        this.origY = origY;
        this.setInitialValues();
    }
    Particle.prototype.setInitialValues = function () {
        this.x = this.origX;
        this.y = this.origY;
        this.y += Math.random() * 40;
        this.speed = Math.random() * 5 - 10;
        this.radius = 20;
        this.opacity = 255;
        this.greenFactor = 255;
    };
    Particle.prototype.draw = function () {
        if (this.y < this.origY - 300 || this.radius <= 1) {
            this.setInitialValues();
        }
        this.radius += 20 / (300 / this.speed);
        this.opacity += 255 / (300 / this.speed);
        this.greenFactor += 255 / ((300 * 2) / this.speed);
        this.y += this.speed;
        var color = "rgb(255," + (Math.floor(this.greenFactor) + 1) + ",0)";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = this.opacity / 255;
        this.ctx.fill();
        this.ctx.closePath();
    };
    return Particle;
}());
;
var particles = __spreadArrays(new Array(canvas.width / 3)).map(function (_, ix) {
    return new Particle(ctx, ix * 3, canvas.height);
});
var started = null;
var draw = function (ts) {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    if (!started) {
        started = ts;
    }
    var progress = (ts - started) / 100;
    particles.forEach(function (particle) { return particle.draw(); });
    requestAnimationFrame(draw);
};
requestAnimationFrame(draw);
