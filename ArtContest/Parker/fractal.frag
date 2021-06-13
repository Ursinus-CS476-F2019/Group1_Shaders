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

void main() {
    //TODO: Fill this in (the reference solution has 13 lines of code,
    //but you can get away with fewer if you want)

    float iteration = 0.0;
    bool escaped = false;
    vec2 z = (v_position-uCenter) / uScale;
    for (float i = 0.0; i < MAX_ITERS; i++) {
        float xNew = (z.x*z.x - z.y*z.y);
        float yNew = 2.0*z.x*z.y;
        z.x = xNew;
        z.y = yNew;
        z = z + uC;
        if ((z.x*z.x+z.y*z.y)>=(uEscape*uEscape) && escaped == false) {
            iteration = i;
            escaped = true;
        }
    }

    float red = pow(uPows.x,-iteration/MAX_ITERS);
    float green = pow(uPows.y,-iteration/MAX_ITERS);
    float blue = pow(uPows.z,-iteration/MAX_ITERS);

    gl_FragColor = vec4(red, green, blue, 1.0);
}
