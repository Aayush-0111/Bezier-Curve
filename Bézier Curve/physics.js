import { sub } from "./Math.js";

// Implementing a simple spring-damping model for smooth, natural motion:
// acceleration = -k * (position - target) - damping * velocity
export function Spring(pos, vel, target, stiffness, damping) {
    const force = sub(target, pos);

    vel.x += force.x * stiffness;
    vel.y += force.y * stiffness;

    vel.x *= damping;
    vel.y *= damping;

    pos.x += vel.x;
    pos.y += vel.y;
}
