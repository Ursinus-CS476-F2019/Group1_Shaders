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

    vec2 z=v_position*uScale-uCenter;

    for(float count=0.0; count< MAX_ITERS; count++){
        float a=z.x;
        float b=z.y;

        float aN=(a*a)-(b*b)+uC.x;
        float bN=(2.0*a*b)+uC.y;

        z=vec2(aN, bN);
        
        if(dot(z,z)>uEscape*uEscape){
          gl_FragColor=vec4( pow(uPows.x, -count/MAX_ITERS), pow(uPows.y, -count/MAX_ITERS),pow(uPows.z, -count/MAX_ITERS), 1.0);
          break;
        }

    }

}
