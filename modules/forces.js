/*
 * Forces is just a module containing different standard forces
 * for the game engine. It is modeled as an object. It may be better
 * if it is represented as an module instead, or a singleton if that 
 * is possible.
 *
 * @Author: Ken Gronnbeck
 */
define(function() {
	// Load some sort of configuration here
	var forces = function Forces() {
		this.gravity = function (object) {
			object.speed.z -= 0.2;
		};
		this.inv_gravity = function (object) {
			if (Math.round(object.speed.z) <= 0) {
				object.speed.z = 0;
				// a hack to fix the rounding errors. 
				// So the object lands on a 
				// "whole" value of z. Look into this later
				object.pos.z = Math.round(object.pos.z);
				return;
			}
			//object.speed.z += 0.3;

		};
	};
	return new forces;
});
