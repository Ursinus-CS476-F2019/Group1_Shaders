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
    float skim = M_PI * floor(uTime/M_PI);
    float c_y = sin(uTime + skim); // when uTime == pi, add a multiple of pi to the argument to sin
    float c_x = -cos(uTime + skim); // when uTime == pi, add a multiple of pi to the argument to cos
    float x = v_position.x;
    float y = v_position.y;
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    
    float dx = abs(x - c_x);
    float dy = abs(y - c_y);
    float dr = sqrt(dx*dx + dy*dy);

    if(dr <= uRadius){
        color = vec4(c_y,exp(-dr*dr/(uRadius*uRadius)),0.0,1.0);
    }else{
        color = vec4(c_y,0.0,0.0,1.0);
    }

    gl_FragColor = color;
}
