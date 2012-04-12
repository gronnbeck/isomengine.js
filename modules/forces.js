define(function() {
	// Load some sort of configuration here
	var forces = function Forces() {
		this.gravity = function (object) {
			object.speed.z -= 0.3;
		};
		this.inv_gravity = function (object) {
			object.speed.z += 0.3;
			if (object.speed.z < 0) {
				object.speed.z = 0;
				// a hack to fix the rounding errors. 
				// So the object lands on a 
				// "whole" value of z. Look into this later
				object.pos.z = Math.round(object.pos.z);
			}
		};
	};
	return new forces;
});
