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
    
    vec2 c = vec2(sin(uTime), cos(uTime));
    vec2 dR = v_position+c;

    vec2 c2 = vec2(sin(uTime), cos(uTime));
    vec2 dR2 = v_position-c2;

    vec2 c3 = vec2(cos(uTime), sin(uTime));
    vec2 dR3 = v_position + (c*0.5);
       
    vec2 c4 = vec2(cos(uTime), sin(uTime));
    vec2 dR4 = v_position - (c*0.5);

    vec2 c5 = vec2(cos(uTime),sin(uTime));
    vec2 dR5 = v_position + (c5);

    vec2 c6 = vec2(cos(uTime),sin(uTime));
    vec2 dR6 = v_position-c6;

    vec2 c7 = vec2(cos(uTime), sin(uTime));
    vec2 dR7 = v_position + (c7*0.5);
       
    vec2 c8 = vec2(cos(uTime), sin(uTime));
    vec2 dR8 = v_position - (c8*0.5);

    vec2 c9 = vec2(sin(uTime), cos(uTime));
    vec2 dR9 = v_position;


    float G = 0.0;
    float R = 0.0;
    float B = 0.0;



    if((dot(dR,dR) < uRadius*uRadius) || (dot(dR2,dR2) < uRadius*uRadius) 
    || (dot(dR3,dR3) < uRadius*uRadius*uRadius) || (dot(dR4,dR4) < uRadius*uRadius*uRadius)
    || (dot(dR5,dR5) < uRadius*uRadius) || (dot(dR6,dR6) < uRadius*uRadius) 
    || (dot(dR7,dR7) < uRadius*uRadius*uRadius) || (dot(dR8,dR8) < uRadius*uRadius*uRadius)
    || (dot(dR9,dR9) < uRadius * 0.03)){
    	R = 1.0;

    
    } else{
        G = 0.0;
        R = 0.0;
    }

    if(dot(dR,dR) < uRadius*uRadius){

        G = exp(-dot(dR,dR)/(uRadius*uRadius));
    }
        

    if(dot(dR2,dR2) < uRadius*uRadius){
        B = 1.0;
        G = exp(-dot(dR2,dR2)/(uRadius*uRadius));
    }

    if(dot(dR5,dR5) < uRadius*uRadius){

        G = exp(-dot(dR5,dR5)/(uRadius*uRadius));
    }
        

    if(dot(dR6,dR6) < uRadius*uRadius){
        B = 1.0;
        G = exp(-dot(dR6,dR6)/(uRadius*uRadius));
    }

    if(dot(dR3,dR3) < uRadius*uRadius){

        G = exp(-dot(dR3,dR3)/(uRadius*uRadius));
    }
        

    if(dot(dR4,dR4) < uRadius*uRadius){
        B = 1.0;
        G = exp(-dot(dR4,dR4)/(uRadius*uRadius));
    }

    if(dot(dR7,dR7) < uRadius*uRadius){

        G = exp(-dot(dR7,dR7)/(uRadius*uRadius));
    }
        

    if(dot(dR8,dR8) < uRadius*uRadius){
        B = 1.0;
        G = exp(-dot(dR8,dR8)/(uRadius*uRadius));
    }

    if(dot(dR9,dR9) < uRadius * 0.001){
        B = 1.0;
        G = 1.0;
        R = 1.0;
    }
    

    

    
    
    gl_FragColor = vec4(R, G, B, 1.0);

}
