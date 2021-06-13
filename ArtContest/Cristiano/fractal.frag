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
    
    vec2 z = (v_position - uCenter)/uScale;

    float escapedAt = 0.0;
    bool isJailed = true;

    for(float i = 1.0; i < MAX_ITERS; i++){

        float realSquared = z.x*z.x;
        float imageSquared = z.y*z.y;
        float escapeSquared = uEscape*uEscape;

        if(isJailed){

        if((realSquared + imageSquared) > escapeSquared){
            escapedAt = i;
            isJailed = false;


        } else{
            vec2 square = vec2(((z.x*z.x) - (z.y*z.y)),(z.x*z.y)+(z.x*z.y));
            z = square + uC;
        }
        }
    }


    float R = pow(uPows.x, (-escapedAt/MAX_ITERS));
    float G = pow(uPows.y, (-escapedAt/MAX_ITERS));
    float B = pow(uPows.z, (-escapedAt/MAX_ITERS));

    gl_FragColor = vec4(R, G, B, 1.0);

}
