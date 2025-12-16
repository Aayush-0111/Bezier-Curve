// Main file for implementing the Bezier Curve using all the sub-modules

import { vec } from "./Math.js";
import { Spring } from "./physics.js";
import { setupMouseInput } from "./input.js";
import { drawScene } from "./Render.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Control Points
const P0 = vec(150, canvas.height / 2);
const P3 = vec(canvas.width - 150, canvas.height / 2);

const P1 = vec(canvas.width / 2 - 150, canvas.height / 2);
const P2 = vec(canvas.width / 2 + 150, canvas.height / 2);

const v1 = vec(0, 0);
const v2 = vec(0, 0);

const target1 = { ...P1 };
const target2 = { ...P2 };

// Physics 
const stiffness = 0.02;
const damping = 0.85;

// Input 
setupMouseInput(canvas, target1, target2);

// Main loop 
function loop() {
    Spring(P1, v1, target1, stiffness, damping);
    Spring(P2, v2, target2, stiffness, damping);

    drawScene(ctx, canvas, P0, P1, P2, P3);
    requestAnimationFrame(loop);
}

loop();
