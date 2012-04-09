define(function(require) {
	var hash = require('lib/hash');
	return function () {
		var objects = new hash({}); 
		var SOLID = 1;
		var PASS_THROUGH = 0;
		this.register = function(object, solid, forces) {
			 objects.setItem(object, {
			 	'object' 		: object,
				'solid' 	 	: solid,
				'forces'		: forces,
				'tempForces'	: []
			});
		};
		this.step = function() {
				objects.each(function(k, object) {
					for (i in object.forces) {
						var force = object.forces[i];
						force(object.object);
					};
					for (i in object.tempForces) {
						var force = object.tempForces[i];
						force(object.object);
					};
					object.tempForces = [];
				});
		};
		this.get = function(object) {
			return objects.getItem(object);
		};
	};
});
