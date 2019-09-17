const canvas: HTMLCanvasElement = document.getElementById('pølse') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

interface Sausage {
    x: number;
    y: number;
    size: number;
    rotation: number;
}

const sausages: Sausage[] = [...new Array(100)].map(() => ({
    x: Math.random(),
    y: 0 - Math.random(),
    size: 50 + Math.random() * 50,
    rotation: Math.random() * 360
})).slice(1);

let started = null;
const draw = (ts: number) => {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    if (!started) {
        started = ts;
    }
    const progress = (ts - started) / 100;

    let processed = false;
    sausages.forEach(sausage => {
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
}

let startedfinal = null;
const drawfinal = (ts: number) => {
    if (!startedfinal) {
        startedfinal = ts;
    }
    const progress = (ts - startedfinal);

    const size = progress * 5;
    const rotation = (progress / 500);

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

const sausageImg = new Image();
sausageImg.onload = () => requestAnimationFrame(draw);
sausageImg.src = 'sausage.png';