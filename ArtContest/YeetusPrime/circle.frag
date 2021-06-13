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
	vec2 cCenter = vec2(-1.0*cos(uTime),sin(uTime));
	//If sin becomes negative, means we reached end of semicircle so we multiply sin by -1 to make it positive again
	//and now that cos is negative, we no longer need to mulptiply by -1 to make it move to the opposite side
	if(sin(uTime)<0.0){
		cCenter = vec2(cos(uTime), -1.0*sin(uTime));
	}
	vec2 diff = v_position-cCenter;
	float redVal = cCenter.y; //Pulls the sin position, makes sure it starts at 0, peaks at 1, then falls back to 0, nver becomes negative since we make sure the y-val is never negative
	float greenVal = exp((-1.0*(length(diff)*length(diff)))/(uRadius*uRadius)); //negative (distance between pixel and center)^2/radius^2
	if(dot(diff,diff)<uRadius*uRadius){
		gl_FragColor = vec4(redVal, greenVal, 0.0, 1.0);
	}else{
		gl_FragColor = vec4(redVal, 0.0, 0.0, 1.0);
	}
}
