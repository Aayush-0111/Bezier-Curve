// For Rendering the curve

import {
    Cubic_Bezier,
    Cubic_Bezier_Tangent,
    normalize,
    mul,
    add
} from "./Math.js";
console.log("rendering");

export function drawScene(ctx, canvas, P0, P1, P2, P3) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bézier curve 
    ctx.strokeStyle = "#00ffaa";
    ctx.lineWidth = 3;
    ctx.beginPath();
    // Small increments in t
    for (let t = 0; t <= 1; t += 0.01) {
        const p = Cubic_Bezier(t, P0, P1, P2, P3);
        if (t === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();

    // Tangents 
    ctx.strokeStyle = "#ffcc00";
    ctx.lineWidth = 1;

    for (let t = 0; t <= 1; t += 0.1) {
        const p = Cubic_Bezier(t, P0, P1, P2, P3);
        const tan = normalize(Cubic_Bezier_Tangent(t, P0, P1, P2, P3));
        const end = add(p, mul(tan, 40));

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }

    drawPoint(ctx, P0, "#ffffff");
    drawPoint(ctx, P1, "#ff4444");
    drawPoint(ctx, P2, "#ff4444");
    drawPoint(ctx, P3, "#ffffff");
}

function drawPoint(ctx, p, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fill();
}
