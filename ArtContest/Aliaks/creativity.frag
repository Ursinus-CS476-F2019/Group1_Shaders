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

    vec2 pos1 = v_position;
    vec2 pos2 = vec2(v_position.x, v_position.y + 1.0);
    vec2 pos3 = vec2(v_position.x, v_position.y);
    vec2 pos4 = vec2(v_position.x, v_position.y);

    float xcoor2 = sin(uTime);
    float ycoor2 = 1.0;
    vec2 c2 = vec2(xcoor2, ycoor2);

    vec2 dR2 = pos2 - c2;

    float xcoor3 = -sin(uTime)*0.2 - 0.2;
    float ycoor3 = -cos(uTime)*0.3;
    vec2 c3 = vec2(xcoor3, ycoor3);

    vec2 dR3 = pos3 - c3;

    float xcoor4 = 0.7;
    float ycoor4 = -cos(uTime)*0.4;
    vec2 c4 = vec2(xcoor4, ycoor4);

    vec2 dR4 = pos4 - c4;

    if(xcoor2 > 1.0)
    {
        xcoor2 = -xcoor2;
    }

     vec2 c = vec2(xcoor2, ycoor2);
     vec2 dR = v_position - c;

     float G = exp(-dot(dR2, dR2)/(2.0*uRadius*uRadius));
     float R = exp(-dot(dR2, dR2)/(uRadius*uRadius));

     float G1 = exp(-dot(dR3, dR3)/(2.0*uRadius*uRadius));
     float R1 = exp(-dot(dR3, dR3)/(uRadius*uRadius));

     float G2 = exp(-dot(dR4, dR4)/(2.0*uRadius*uRadius));
     float R2 = exp(-dot(dR4, dR4)/(uRadius*uRadius));

     if (dot(dR2, dR2) <= uRadius*uRadius*3.0) {
         gl_FragColor = vec4(R, G, 0.0, 1.0);
         if (dot(dR3, dR3) <= dot(dR2, dR2)) {
             gl_FragColor = vec4(R1, G1, 0.0, 1.0);
         }
         
     } 
     else if (dot(dR4, dR4) <= dot(dR3, dR3)) {
             gl_FragColor = vec4(R2, 0.0, G2, 1.0);
         } 
    else {
         gl_FragColor = vec4(R1, 0.0, G1, 1.0);
     }
}
