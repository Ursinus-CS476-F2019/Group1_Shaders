precision mediump float;

// PI is not included by default in GLSL
#define M_PI 3.1415926535897932384626433832795

// Uniforms set from Javascript that are constant
// over all fragments
uniform float uTime; // Time elapsed since beginning of simulation

// The 2D position of the pixel in this fragment, interpolated via
// barycentric coordinates from positions of triangle vertices
varying vec2 v_position;

void main() {

    float mag = dot(v_position, v_position);

    float red = sin(uTime) + mag*1.5;
    float green = sin(mag) + cos(uTime);
    float blue = cos(mag);
    float alpha = sin(uTime + mag);

    gl_FragColor = vec4(red, green, blue, alpha);
}
