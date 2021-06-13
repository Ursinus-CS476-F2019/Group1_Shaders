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
	//creates circle starting on right side of unit circle
	vec2 cCenter1 = vec2(-1.0*cos(uTime)*cos(uTime), -1.0*sin(uTime));
	vec2 cCenter2 = vec2(cos(uTime)*cos(uTime), sin(uTime));
	
	vec2 diff1 = v_position-cCenter1;
	vec2 diff2 = v_position-cCenter2;

	float fallOff1 = exp((-1.0*(length(diff1)*length(diff1)))/(uRadius*uRadius)); 
	float fallOff2 = exp((-1.0*(length(diff2)*length(diff2)))/(uRadius*uRadius)); 
	float fallOff3 = exp(-length(v_position)*length(v_position)/(uRadius*uRadius));
	float fallOff4 = exp(-length(v_position)*length(v_position)/(2.0*uRadius*2.0*uRadius));
	float blueVal2 = cCenter1.x;
	if(dot(v_position,v_position)<2.0*uRadius*2.0*uRadius){
		if(dot(v_position,v_position)<uRadius*uRadius){
			gl_FragColor = vec4(fallOff3, 0.0, 0.1, 1.0);
		}else{
			gl_FragColor = vec4(0.0, 0.2, fallOff4, 1.0);
		}
	}
	if(dot(diff1,diff1)<uRadius*uRadius){
		gl_FragColor = vec4(0.0, fallOff1, 0.0, 1.0);
	}
	if(dot(diff2,diff2)<uRadius*uRadius){
		gl_FragColor = vec4(0.0, fallOff2, 0.0, 1.0);
	}
	
}
