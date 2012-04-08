define(function() {
	return function () {
		var objects = []; 
		var SOLID = 1;
		var PASS_THROUGH = 0;
		this.register = function(id, object, solid, forces) {
			objects.push({
				'id'	: id,
				'object': object,
				'solid' : solid,
				'forces': forces
			});
		};
		this.step = function() {
			for (object in objects) {
				for (force in forces) {
					force(object);
				};
			};		
		};
		this.collisionDetection = function () {
			// do collisionDetection and return the pairs that collided
		};
	};
});
