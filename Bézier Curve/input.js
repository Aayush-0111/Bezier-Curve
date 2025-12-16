// Implementing function for setting-up mouse input and interaction

export function setupMouseInput(canvas, target1, target2) {
    let dragging = null;
    const GRAB_RADIUS = 20;

    canvas.addEventListener("mousedown", (e) => {
        const mx = e.clientX;
        const my = e.clientY;
        
        const dist1 = Math.hypot(target1.x - mx, target1.y - my);
        const dist2 = Math.hypot(target2.x - mx, target2.y - my);
        
        if (dist1 < GRAB_RADIUS) dragging = target1;
        else if (dist2 < GRAB_RADIUS) dragging = target2;
    });

    canvas.addEventListener("mousemove", (e) => {
        if (dragging) {
            dragging.x = e.clientX;
            dragging.y = e.clientY;
        }
    });

    canvas.addEventListener("mouseup", () => {
        dragging = null;
    });
}
