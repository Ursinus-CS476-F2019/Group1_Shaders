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

    float remainder = mod(uTime, M_PI);
   
    vec2 center = vec2(-cos(remainder), sin(remainder));
    vec2 distance = center - v_position;

    float red = sin(remainder);
    float yellow = exp(-(dot(distance, distance)) / (uRadius * uRadius));

    gl_FragColor = vec4(red, yellow, 0.0, 1.0);

}
