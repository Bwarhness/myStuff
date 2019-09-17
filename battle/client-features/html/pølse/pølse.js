var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var canvas = document.getElementById('pølse');
var ctx = canvas.getContext('2d');
var sausages = __spreadArrays(new Array(100)).map(function () { return ({
    x: Math.random(),
    y: 0 - Math.random(),
    size: 50 + Math.random() * 50,
    rotation: Math.random() * 360
}); }).slice(1);
var started = null;
var draw = function (ts) {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    if (!started) {
        started = ts;
    }
    var progress = (ts - started) / 100;
    var processed = false;
    sausages.forEach(function (sausage) {
        if (sausage.y > 1.2) {
            return;
        }
        processed = true;
        sausage.x -= ((Math.random() - 0.5) / 100) / 10;
        sausage.rotation -= (Math.random() - 0.5);
        sausage.y += progress ? Math.log(progress * 1000) / 1000 : 0;
        ctx.save();
        ctx.translate(sausage.x * canvas.width, sausage.y * canvas.height);
        ctx.rotate(sausage.rotation * Math.PI / 180);
        ctx.drawImage(sausageImg, 0, 0, 100, 100);
        ctx.restore();
    });
    if (processed) {
        requestAnimationFrame(draw);
    }
    else {
        drawfinal(ts);
    }
};
var startedfinal = null;
var drawfinal = function (ts) {
    if (!startedfinal) {
        startedfinal = ts;
    }
    var progress = (ts - startedfinal);
    var size = progress * 5;
    var rotation = (progress / 500);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);
    ctx.drawImage(sausageImg, size / -2, size / -2, size, size);
    ctx.restore();
    console.clear();
    if (progress < 4000) {
        requestAnimationFrame(drawfinal);
    }
    else {
        canvas.width = canvas.width;
        canvas.height = canvas.height;
    }
};
var sausageImg = new Image();
sausageImg.onload = function () { return requestAnimationFrame(draw); };
sausageImg.src = 'sausage.png';
