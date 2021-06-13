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
// The 2D texture coordinate in this fragment, interpolated via
// barycentric coordinates from positions of triangle vertices
varying highp vec2 v_texture;

uniform sampler2D uSampler;

void main() {
    //TODO: Fill this in (the reference solution has 13 lines of code,
    //but you can get away with fewer if you want)

    //Straight texture map
    vec4 texColor = texture2D(uSampler, v_texture);
    vec2 inv_v_tex = vec2(v_texture.x, -v_texture.y);
    vec4 invTexColor = texture2D(uSampler, inv_v_tex);

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

    // if the coordinates are 'outside' of the fractal, then color using the texture
    // this will give the shape of the fractal in white in the middle of the texture
    if(color.x != 1.0 && color.y != 1.0 && color.z != 1.0){
        color = texColor;
    }else{
        color = invTexColor;
    }

    gl_FragColor = color;
}
