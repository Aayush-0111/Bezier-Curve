// Implementing the Math behind Bézier curve

// A cubic Bézier curve, at the core, is comprised of the Quandratic Bézier curve which in-turn is comprised of Linear Bézier curve.

export function vec(x,y) {
    return {x,y};
}

export function add(a,b) {
    return {x: a.x + b.x , y: a.y + b.y};
}

export function sub(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}

export function mul(v, s) {
    return { x: v.x * s, y: v.y * s };
}

export function length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalize(v) {
    const len = length(v);
    return len === 0 ? vec(0, 0) : mul(v, 1 / len);
}


// Implementing Linear_Bezier function

export function Linear_Bezier(p0, p1, t) {
    return {
        x : (1-t)*p0.x + t*p1.x,
        y : (1-t)*p0.y + t*p1.y
    };
}

// Implementing Quadratic_Bezier function using Linear_Bezier

export function Quadratic_Bezier(t, p0, p1, p2) {
    const q0 = Linear_Bezier(p0, p1, t);
    const q1 = Linear_Bezier(p1, p2, t);
    return Linear_Bezier(q0, q1, t);
}

// Implementing CubiC_Bezier function using Quadratic_Bezier : B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃

export function Cubic_Bezier(t, p0, p1, p2, p3) {
    const a = Quadratic_Bezier(t, p0, p1, p2);
    const b = Quadratic_Bezier(t, p1, p2, p3);

    return Linear_Bezier(a,b,t);
}

// Implementing Cubic_Bezier_Tangent : B'(t) = 3(1−t)²(P₁−P₀) + 6(1−t)t(P₂−P₁) + 3t²(P₃−P₂)

export function Cubic_Bezier_Tangent(t, p0, p1, p2, p3) {
    const q0 = Quadratic_Bezier(t, p0, p1, p2);
    const q1 = Quadratic_Bezier(t, p1, p2, p3);

    const dq0 = add(
        mul(sub(p1, p0), 2 * (1 - t)),
        mul(sub(p2, p1), 2 * t)
    );

    const dq1 = add(
        mul(sub(p2, p1), 2 * (1 - t)),
        mul(sub(p3, p2), 2 * t)
    );

    return add(
        sub(q1, q0),
        add(
            mul(dq0, (1 - t)),
            mul(dq1, t)
        )
    );
}

