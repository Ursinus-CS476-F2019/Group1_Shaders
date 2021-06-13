precision highp float;

// The maximum number of iterations before escape should be
// included here (You can change this)
#define MAX_ITERS 100.0

// Uniforms set from Javascript that are constant
// over all fragments
uniform vec2 uCenter; // Where the origin (0, 0) is on the canvas
uniform vec2 uC; // z -> z^2 + uC
uniform float uScale; // Scale of fractal
uniform float uEscape; // Escape distance
uniform vec3 uPows; /* Final color will be R = uPows.x^(-count/MAX_ITERS)
                    *                      G = uPows.y^(-count/MAX_ITERS)
                    *                      B = uPows.z^(-count/MAX_ITERS) */

// The 2D position of the pixel in this fragment, interpolated via
// barycentric coordinates from positions of triangle vertices
varying vec2 v_position;

void main() {
    //TODO: Fill this in (the reference solution has 13 lines of code,
    //but you can get away with fewer if you want)
	vec2 u_position = uScale*v_position - uCenter; //Gives initial position based off of v_postion
	float u_positionX;
	float u_positionY;
	for(float i=0.0;i<MAX_ITERS;i+=1.0){
		//If mag of u > escape value, if gets the assigned color based on uPows
		if(dot(u_position, u_position)>(uEscape*uEscape)){
			gl_FragColor = vec4(pow(uPows.x, (-i/MAX_ITERS)), pow(uPows.y, (-i/MAX_ITERS)), pow(uPows.z, (-i/MAX_ITERS)), 1.0);
		}
		u_positionX = u_position.x*u_position.x - u_position.y*u_position.y; //x-comp of new position
		u_positionY = u_position.x*u_position.y+u_position.x*u_position.y; //y-comp of new position
		u_position = vec2(u_positionX,u_positionY)+uC; //updates u_position z->z_{n-1}^2+c
	}
}
