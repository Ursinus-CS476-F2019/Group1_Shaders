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
varying vec2 v_position; // = z_0

void main() {
    //TODO: Fill this in (the reference solution has 13 lines of code,
    //but you can get away with fewer if you want)
    vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
    vec2 z = uScale*v_position - uCenter;
    for(float i = 0.0;i<MAX_ITERS;i += 1.0){
        if(z.x*z.x + z.y+z.y > uEscape*uEscape){
            color = vec4(pow(uPows.x,(-i/MAX_ITERS)),pow(uPows.y,(-i/MAX_ITERS)),pow(uPows.z,(-i/MAX_ITERS)),1.0);
            break;
        }else{
            z = vec2(uC.x + (z.x*z.x - z.y*z.y),uC.y + (2.0*z.x*z.y));
        }
    }

    gl_FragColor = color;
}
