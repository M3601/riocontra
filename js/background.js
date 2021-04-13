// author: Amato Michele Pasquale (https://github.com/M361)

const N = 75;
let canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "50%";
canvas.style.left = "50%";
canvas.style.transform = "translate(-50%, -50%)";
canvas.style["z-index"] = "-1";
document.body.appendChild(canvas);
canvas.setAttribute("id", "background");
canvas.setAttribute("height", document.documentElement.offsetHeight);
canvas.setAttribute("width", document.documentElement.offsetWidth);

let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let r = (min, max, d) => {
  return Math.round(Math.random() * (max - min)) / (d ?? 1) + min / (d ?? 1);
};
let particles = [];
for (let i = 0; i < N; i++) {
  particles.push({
    x: r(0, width),
    y: r(height - height * 0.2, height),
    dx: r(-30, 30, 10),
    dy: r(10, 80, 10),
    r: r(2, 8),
    cr: 0,
    c: availableColors[r(0, availableColors.length - 1)],
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < N; i++) {
    let p = particles[i];
    ctx.beginPath();
    p.cr += 0.2;
    ctx.arc(p.x, p.y, (p.cr = Math.min(p.cr, p.r)), 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
    ctx.closePath();
    p.x += p.dx;
    p.y -= p.dy;
    if (renew) {
      if (p.y < p.r || p.y > height - p.r || p.x <= p.r || p.x >= width - p.r)
        p.cr = 0;
      if (p.y < p.r) {
        p.y = height - p.r;
        p.dy = r(10, 80, 10);
      }
      if (p.y > height - p.r) {
        p.y = p.r;
        p.dy = r(10, 80, 10);
      }
      if (p.x <= p.r) p.x = r(0, width);
      if (p.x >= width - p.r) p.x = r(0, width);
    } else {
      if (p.y < p.r || p.y > height - p.r || p.x <= p.r || p.x >= width - p.r) {
        p.x = -10;
        p.y = -10;
      }
    }
  }
}

setInterval(draw, 18);
