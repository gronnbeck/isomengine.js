define(function() {
	return function () {
		var objects = []; 
		var SOLID = 1;
		var PASS_THROUGH = 0;
		this.register = function(object, solid, forces) {
			objects.push({ object : {
				'solid' : solid,
				'forces': forces
			}});
		};
		this.step = function() {
			for (object in objects) {
				for (force in forces) {
					force(object);
				};
			};		
		};
	};
});
