# Bezier-Curve
# Interactive Bézier Curve with Spring Physics

An interactive cubic Bézier curve visualization that responds to mouse movement with smooth spring-damped physics.

## Overview
Move your mouse to control the curve like a flexible rope. The curve uses pure mathematical implementation with spring physics for smooth, organic motion.

## Math Implementation

### Cubic Bézier Curve Formula
```
B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃
```

### Hierarchical Construction

**Linear Bézier** (interpolation):
```
L(t) = (1−t)P₀ + tP₁
```

**Quadratic Bézier** (from two linear):
```
Q(t) = Linear(P₀,P₁,t) → Linear(P₁,P₂,t)
```

**Cubic Bézier** (from two quadratic):
```
C(t) = Quadratic(P₀,P₁,P₂,t) → Quadratic(P₁,P₂,P₃,t)
```

### Tangent Vectors
```
B'(t) = 3(1−t)²(P₁−P₀) + 6(1−t)t(P₂−P₁) + 3t²(P₃−P₂)
```

The curve is sampled at t = 0, 0.01, 0.02, ... 1.0 (101 points). Tangents are drawn every 0.1.

## Physics Model

### Spring-Damper System
```javascript
force = target - position
velocity += force × stiffness  // stiffness = 0.02
velocity *= damping            // damping = 0.85
position += velocity
```

This creates smooth, natural motion without instant snapping.

## Design Choices

### File Organization
- `Math.js` → Vector math and Bézier formulas
- `physics.js` → Spring physics
- `input.js` → Mouse controls
- `Render.js` → Drawing to canvas
- `Bezier_function.js` → Main loop

### Control Behavior
- **P₀ and P₃**: Fixed endpoints (left and right)
- **P₁ and P₂**: Follow mouse position
- Both control points move together for symmetrical rope behavior

### Visual Design
- **Curve**: Cyan (#00ffaa)
- **Tangents**: Yellow (#ffcc00)
- **Fixed Points**: White circles
- **Control Points**: Red circles
- **Background**: Dark gray (#111)

## How to Run
```bash
# Start local server
python -m http.server 8000
# or
npx serve

# Open browser
http://localhost:8000
```

Move your mouse to interact with the curve!
