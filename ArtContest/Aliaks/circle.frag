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

    float arclenght = 2.0 * M_PI * (sin(uTime)/360.0);
    float xCoor = -cos(uTime);
    float yCoor = sin(uTime);
    

    if (xCoor < 1.0 && yCoor > 0.0){
        xCoor = xCoor;
    }
    else {
        xCoor = -xCoor;
        yCoor = -yCoor;
    }

    vec2 c = vec2(xCoor, yCoor);
    vec2 dR = v_position - c;

    float G = exp(-dot(dR, dR)/(2.0*uRadius*uRadius));
    float R = exp(-dot(dR, dR)/(2.0*uRadius*uRadius));

    if (dot(dR, dR) <= uRadius*uRadius) {
        gl_FragColor = vec4(sin(uTime), G, 0.0, 1.0);
    }
    else {
        gl_FragColor = vec4(abs(sin(uTime)),0.0,0.0,1.0);
    }
     
}
