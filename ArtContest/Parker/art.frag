precision mediump float;

// PI is not included by default in GLSL
#define M_PI 3.1415926535897932384626433832795

// Uniforms set from Javascript that are constant
// over all fragments
uniform float uTime; // Time elapsed since beginning of simulation
uniform float uRadius; // Radius of blob

// The 2D position of the pixel in this fragment, interpolated via
// barycentric coordinates from positions of triangle vertices
varying vec2 v_position;

void main() {
    //TODO: Fill this in.  The center should move in an arc from the left of the screen
    //to the right of the screen

    //float remainder = mod(uTime,M_PI);
    float red = 0.0;
    vec2 center = vec2(0.5*sin(uTime)*cos(uTime),sin(uTime));
    vec2 diff = v_position - center;
    vec2 center2 = vec2(sin(uTime),0.5*sin(uTime)*cos(uTime));
    vec2 diff2 = v_position - center2;
    vec2 center3 = vec2(cos(uTime),sin(uTime));
    vec2 diff3 = v_position - center3;
    float blue = exp(-dot(diff2,diff2)/(uRadius*uRadius));
    float green = exp(-dot(diff,diff)/(uRadius*uRadius));

    if (floor(diff) == floor(diff2)) {
        gl_FragColor = vec4(0.3216, 0.0784+green, 1.0, 1.0);
    } else {
        gl_FragColor = vec4(0.0,green,blue,1.0);
    }
}
