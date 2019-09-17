const canvas: HTMLCanvasElement = document.getElementById('burn') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

class Particle {
    x: number;
    y: number;
    speed: number;
    radius: number;
    opacity: number;
    greenFactor: number;
    constructor(public ctx: CanvasRenderingContext2D,
                public origX: number,
                public origY: number)
    {
        this.setInitialValues();
    }

    setInitialValues() {
        this.x = this.origX;
        this.y = this.origY;

        this.y += Math.random() * 40;

        this.speed = Math.random() * 5 - 10;
        this.radius = 20;
        this.opacity = 255;
        this.greenFactor = 255;
    }

    draw() {
        if (this.y < this.origY - 300 || this.radius <= 1) {
            this.setInitialValues();
        }
        this.radius += 20 / (300 / this.speed);
        this.opacity += 255 / (300 / this.speed);
        this.greenFactor += 255 / ((300*2) / this.speed);
        this.y += this.speed;

        
        const color = "rgb(255," + (Math.floor(this.greenFactor) + 1) + ",0)";

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = this.opacity / 255;
        this.ctx.fill();
        this.ctx.closePath();
    }
};

const particles: Particle[] = [...new Array(canvas.width / 3)].map((_, ix) => 
    new Particle(ctx, ix * 3, canvas.height));

let started = null;
const draw = (ts: number) => {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    if (!started) {
        started = ts;
    }
    const progress = (ts - started) / 100;

    particles.forEach(particle => particle.draw());

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
