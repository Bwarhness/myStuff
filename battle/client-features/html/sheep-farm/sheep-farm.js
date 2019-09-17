var SHEEP_AGE_ADULT = 3500;
var SHEEP_AGE_MAX = 30000;
var SHEEP_BABY_WAIT_TIME = 3000;
var SHEEP_MAX_CNT = 20;
var Sheep = /** @class */ (function () {
    function Sheep(x, y) {
        this.babytime = 0;
        this.age = 0;
        this.size = 50;
        this.xmotion = 0; // 0 - 1
        this.ymotion = -0.001; // 0 - 1
        this.id = Sheep.id++;
        this.x = x;
        this.y = y;
        this.ishorny = Math.random() > 0.5;
    }
    Sheep.prototype.setAge = function (age) {
        this.age = age;
        return this;
    };
    Sheep.prototype.setHorny = function (h) {
        this.ishorny = h;
        return this;
    };
    Sheep.id = 1;
    return Sheep;
}());
;
var canvas = document.getElementById('farm');
var ctx = canvas.getContext('2d');
var sheeps = [
    new Sheep(Math.random(), Math.random()).setAge(SHEEP_AGE_ADULT).setHorny(true),
    new Sheep(Math.random(), Math.random()).setAge(SHEEP_AGE_ADULT).setHorny(true),
    new Sheep(Math.random(), Math.random()).setAge(SHEEP_AGE_ADULT).setHorny(true)
];
var findnearbysheep = function (x, y, shipsheep) {
    var candidate = {
        value: Number.MAX_SAFE_INTEGER,
        sheep: null
    };
    var foundsheep = sheeps.find(function (sheep) {
        if (shipsheep == sheep) {
            return;
        }
        var cx = Math.abs(sheep.x - x);
        var cy = Math.abs(sheep.y - y);
        var cv = cx + cy;
        if (cv < candidate.value) {
            candidate.sheep = sheep;
            candidate.value = cv;
        }
        if (cx < 0.01 && cy < 0.01) {
            return sheep;
        }
    });
    if (foundsheep) {
        return {
            x: foundsheep.x,
            y: foundsheep.y,
            reallyclose: true,
            sheep: foundsheep
        };
    }
    if (candidate.sheep == null) {
        return null;
    }
    return {
        x: candidate.sheep.x,
        y: candidate.sheep.y,
        reallyclose: false,
        sheep: candidate.sheep
    };
};
var drawsheep = function (sheep) {
    var coords = [sheep.x, 1 - sheep.y];
    ctx.drawImage(sheepImg, canvas.width * coords[0] - sheep.size, canvas.height * coords[1] - sheep.size, sheep.size, sheep.size);
};
var drawkillsheep = function (sheep) {
};
var tryforbaby = function (sheep1, sheep2) {
    if (sheep1.age < SHEEP_AGE_ADULT) {
        return;
    }
    if (sheep1.babytime > 0) {
        return;
    }
    if (sheep2.age < SHEEP_AGE_ADULT) {
        return;
    }
    if (sheep2.babytime > 0) {
        return;
    }
    if (sheeps.length > SHEEP_MAX_CNT) {
        return;
    }
    sheep1.babytime = SHEEP_BABY_WAIT_TIME;
    sheep2.babytime = SHEEP_BABY_WAIT_TIME;
    var babysheep = new Sheep((sheep1.x + sheep2.x) / 2, (sheep1.y + sheep2.y) / 2);
    babysheep.ymotion = Math.random() / -50;
    sheeps.push(babysheep);
};
var lastTimestamp = null;
var draw = function (timestamp) {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }
    var stepped = (timestamp - lastTimestamp) / 100;
    for (var i = 0; i < sheeps.length; i++) {
        var sheep = sheeps[i];
        if (sheep.babytime > 0) {
            sheep.babytime = Math.max(0, sheep.babytime - stepped);
        }
        drawsheep(sheep);
        if (Math.random() * sheep.age > SHEEP_AGE_MAX / 2) {
            sheep.size += stepped / 50;
        }
        sheep.x += sheep.xmotion;
        sheep.y += sheep.ymotion;
        if (sheep.x < 0) {
            sheep.x = 0;
            sheep.xmotion *= -0.7;
        }
        if (sheep.y < 0) {
            sheep.y = 0;
            sheep.ymotion *= -0.7;
        }
        if (sheep.x > 1) {
            sheep.x = 1;
            sheep.xmotion *= -0.7;
        }
        if (sheep.y > 1) {
            sheep.y = 1;
            sheep.ymotion *= -0.7;
        }
        sheep.ymotion -= 0.001;
        if (!sheep.ishorny) {
            sheep.xmotion = (Math.random() - (sheep.x)) * 0.000008 * stepped;
        }
        else {
            var nearbyinfo = findnearbysheep(sheep.x, sheep.y, sheep);
            if (!nearbyinfo) {
                sheep.xmotion = (Math.random() - (sheep.x)) * 0.000008 * stepped;
            }
            else {
                if (nearbyinfo.reallyclose) {
                    tryforbaby(sheep, nearbyinfo.sheep);
                    sheep.ymotion = Math.random() / -30;
                    sheep.xmotion = (Math.random()) / 50;
                    nearbyinfo.sheep.ymotion = Math.random() / -30;
                    nearbyinfo.sheep.xmotion = (Math.random()) / -50;
                }
                sheep.xmotion += 0.000008 * stepped * (nearbyinfo.x > sheep.x ? 1 : -1);
            }
        }
        sheep.age += stepped;
        if (sheep.age > SHEEP_AGE_MAX) {
            sheeps.splice(i, 1);
            i--;
            drawkillsheep(sheep);
        }
    }
    ;
    requestAnimationFrame(draw);
};
var sheepImg = new Image();
sheepImg.onload = function () { return requestAnimationFrame(draw); };
sheepImg.src = 'sheep.png';
