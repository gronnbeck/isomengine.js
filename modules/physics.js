define(function(require) {
	var hash = require('lib/hash');
	var Forces = require('modules/forces');
	var item = function(object, solid, forces) {
		this.object = object;
		this.solid = solid;
		this.forces = forces;
		this.tempForces = [];
		this.addTempForce = function (force) {
			this.tempForces.push(Forces[force]);
		};
	};
	var physics = function Physics() {
		var objects = new hash({}); 
		var SOLID = 1;
		var PASS_THROUGH = 0;
		this.register = function(object, solid, forces) {
			// TODO Make this a object function instead
			 objects.setItem(object, new item(object, solid, forces));
		};
		this.tick = function() {
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
	physics.forces = Forces;
	return physics;
});
