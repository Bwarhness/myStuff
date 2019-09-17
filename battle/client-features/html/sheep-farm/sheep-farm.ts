const SHEEP_AGE_ADULT = 3500;
const SHEEP_AGE_MAX = 30000;

const SHEEP_BABY_WAIT_TIME = 3000;

const SHEEP_MAX_CNT = 20;

class Sheep {
    private static id = 1;

    babytime: number = 0;
    id: number;
    age: number = 0;
    size: number = 50;
    x: number; // 0 - 1
    y: number; // 0 - 1
    xmotion: number = 0; // 0 - 1
    ymotion: number = -0.001; // 0 - 1
    ishorny: boolean;

    constructor(x: number, y: number) {
        this.id = Sheep.id++;
        this.x = x;
        this.y = y;
        this.ishorny = Math.random() > 0.5;
    }

    setAge(age: number) {
        this.age = age;
        return this;
    }

    setHorny(h: boolean) {
        this.ishorny = h;
        return this; 
    }
};

const canvas: HTMLCanvasElement = document.getElementById('farm') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const sheeps: Sheep[] = [
    new Sheep(Math.random(), Math.random()).setAge(SHEEP_AGE_ADULT).setHorny(true),
    new Sheep(Math.random(), Math.random()).setAge(SHEEP_AGE_ADULT).setHorny(true),
    new Sheep(Math.random(), Math.random()).setAge(SHEEP_AGE_ADULT).setHorny(true)
];

const findnearbysheep = (x: number, y: number, shipsheep?: Sheep): { sheep: Sheep, x: number, y: number, reallyclose: boolean} => {
    const candidate: { value: number, sheep?: Sheep } = {
        value: Number.MAX_SAFE_INTEGER,
        sheep: null
    };
    const foundsheep = sheeps.find((sheep) => {
        if (shipsheep == sheep) {
            return;
        }
        const cx = Math.abs(sheep.x - x);
        const cy = Math.abs(sheep.y - y);
        const cv = cx + cy;
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
        }
    }

    if (candidate.sheep == null) {
        return null;
    }

    return {
        x: candidate.sheep.x,
        y: candidate.sheep.y,
        reallyclose: false,
        sheep: candidate.sheep
    }
}

const drawsheep = (sheep: Sheep) => {
    const coords = [sheep.x, 1 - sheep.y]
    ctx.drawImage(sheepImg,
        canvas.width * coords[0] - sheep.size,
        canvas.height * coords[1] - sheep.size,
        sheep.size, sheep.size);
};

const drawkillsheep = (sheep: Sheep) => {

};

const tryforbaby = (sheep1: Sheep, sheep2: Sheep) => {
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

    const babysheep = new Sheep((sheep1.x + sheep2.x) / 2, (sheep1.y + sheep2.y) / 2);
    babysheep.ymotion = Math.random() / -50;
    sheeps.push(babysheep);
}

let lastTimestamp = null;
const draw = (timestamp: number) => {

    canvas.width = canvas.width;
    canvas.height = canvas.height;

    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }
    const stepped = (timestamp - lastTimestamp) / 100;

    for (let i = 0; i < sheeps.length; i++ ) {
        const sheep = sheeps[i];

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
            const nearbyinfo = findnearbysheep(sheep.x, sheep.y, sheep);
            if (!nearbyinfo) {
                sheep.xmotion = (Math.random() - (sheep.x)) * 0.000008 * stepped;
            } else {
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
    };
    requestAnimationFrame(draw);
};


const sheepImg = new Image();
sheepImg.onload = () => requestAnimationFrame(draw);
sheepImg.src = 'sheep.png';