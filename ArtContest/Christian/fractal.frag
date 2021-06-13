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
 
    vec2 z = v_position * uScale - uCenter;

    for(float n = 0.0; n < MAX_ITERS; n++){
        float a = z.x;
        float b = z.y;

        float a_I = (a * a) - (b * b) + uC.x;
        float b_I = (2.0 * a * b) + uC.y;

        z = vec2(a_I, b_I);
        
        if(dot(z,z) > uEscape * uEscape){
            gl_FragColor = vec4(pow(uPows.x, -n/MAX_ITERS), pow(uPows.y,-n/MAX_ITERS), pow(uPows.z,-n/MAX_ITERS), 1.0);
            break;
        }
        
    }
    
}
