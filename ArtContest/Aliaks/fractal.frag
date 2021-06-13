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

    vec2 z = (v_position-uCenter)/uScale;
    float zMagn = sqrt(z.x*z.x + z.y*z.y);
    float count = 0.0;

    for (float i = 0.0; i < MAX_ITERS; i++) {
        if (zMagn > uEscape)
        {
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
            break;
        }
        else
        {
            count++;
            float a = z.x;
            float b = z.y;
            float newA = a*a -b*b;
            float newB = 2.0*a*b;
            z = vec2(newA, newB) + uC;
            zMagn = sqrt(z.x*z.x + z.y*z.y);
        }
    }

    float R = pow(uPows.x, -count/MAX_ITERS);
    float G = pow(uPows.y, -count/MAX_ITERS);
    float B = pow(uPows.z, -count/MAX_ITERS);
    gl_FragColor = vec4(R, G, B, 1.0);
}
