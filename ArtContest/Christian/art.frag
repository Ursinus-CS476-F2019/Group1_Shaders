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
   
    float x = cos(0.5*uTime);
    float y = sin(-uTime);
    vec2 c = vec2(x, y);
    vec2 dr = v_position-c;
    float g = exp(-dot(dr, dr)/(2.0 * uRadius * uRadius));
    gl_FragColor = vec4(y, g, 0.0, 1.0);
}
