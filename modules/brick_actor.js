/*
 * An actor is an object that interacts with the game environment.
 * That is it moves on top of a board and can collide with solid
 * objects in the game world. 
 *
 * An brick actor is an actor based on the solid object brick. 
 *
 */


define(function(require) {
	// The helper method for inheritation I've decided to use
	// Consider using this pattern next time (or maybe impl later)
	// http://ejohn.org/blog/simple-javascript-inheritance

	// TODO If I decide to use inheritance this way. 
	// Move it to a more reusable place. 
	function inherit(child, parent) {
		child.prototype = parent;
		var i;
		child = child || {};
		for (i in parent) {
			if (parent.hasOwnProperty(i)) {
				child[i] = parent[i];
			}
		}
	}


	var brick = require('modules/brick');
	var BrickActor = function (cxt) {	
		// BETA for taking care of transposing the coordinates correctly
		inherit(this, new brick(cxt));
		this.draw = function() {
			var size = this.size;
			var x = size + this.pos.x + this.pos.y; 
			var y = 0.5*this.pos.x - 0.5*this.pos.y + 20*(15 - this.pos.z); 
			// The last positioning variable for y must be made more dynamic.
			// It should adjust according the Height of the canvas
			// Function:
			// 		brick_height * (board_height - brick_level)		
			this.prototype.draw(x,y);
		};
		return this;
	};

	return BrickActor;
});
