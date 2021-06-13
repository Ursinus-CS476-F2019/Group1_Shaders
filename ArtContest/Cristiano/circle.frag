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

    // Circle
    vec2 c = vec2(sin(uTime), cos(uTime));
    vec2 dR = v_position+c;

    // Blob

    float G = exp(-dot(dR,dR)/(uRadius*uRadius));
    float R = 0.0;



    if((dot(dR,dR) < uRadius*uRadius) && cos(uTime) < -0.2){
    	R = 1.0;
    
    
    } else if(cos(uTime) < -0.2){

        float rem = uTime - floor(uTime);
        R = dot(cos(uTime),cos(uTime));


    } else{

        G = 0.0;
        R = 0.0;

    }

    
    gl_FragColor = vec4(R, G, 0.0, 1.0);

}
