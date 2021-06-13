precision highp float;

// The maximum number of iterations before escape should be
// included here (You can change this)
#define MAX_ITERS 100.0

// Uniforms set from Javascript that are constant
// over all fragments
uniform vec2 uCenter; // Where the origin (0, 0) is on the canvas
uniform vec2 uC; // z -> z^2 + uC
uniform float uScale; // Scale of fractal
uniform float uEscape; // Escape distance
uniform vec3 uPows; /* Final color will be R = uPows.x^(-count/MAX_ITERS)
                    *                      G = uPows.y^(-count/MAX_ITERS)
                    *                      B = uPows.z^(-count/MAX_ITERS) */

// The 2D position of the pixel in this fragment, interpolated via
// barycentric coordinates from positions of triangle vertices
varying vec2 v_position;

vec2 complexMultiplication(vec2 a, vec2 b) {
    return vec2((a.x * b.x) - (a.y * b.y), (a.x * b.y) + (b.x * a.y));
}

void main() {

    vec2 u_position = uScale * v_position - uCenter;

    // Declare these out side the loop so they dont get 
    // declared on every pass
    float count;
    vec2 squared;

    for (float i=0.0; i < MAX_ITERS; i++) {
        squared = complexMultiplication(u_position, u_position);
        squared += uC;

        if((squared.x * squared.x) + (squared.y * squared.y) > uEscape * uEscape) {
            count = i;
            break;
        }

        u_position.x = squared.x;
        u_position.y = squared.y;
    }

    float colorNum = -count / MAX_ITERS;
    
    float red = pow(uPows.x, colorNum);
    float green = pow(uPows.y, colorNum);
    float blue = pow(uPows.z, colorNum);

    gl_FragColor = vec4(red, green, blue, 1.0);

}
