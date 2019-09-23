precision mediump float;

// Uniforms set from Javascript that are constant
// over all fragments
uniform vec2 uCenter;
uniform float uRadius;

// The 2D position of the pixel in this fragment, interpolated via
// barycentric coordinates from positions of triangle vertices
varying vec2 v_position;

void main() {
    //TODO: Fill this in
    vec2 diff = v_position - uCenter;
    if (dot(diff, diff) <= uRadius*uRadius) {
        // Red on inside
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    else {
        // Black on the outside
        gl_FragColor = vec4(0, 0, 0, 1);
    }
    
}
