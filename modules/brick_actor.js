/*
 * An actor is an object that interacts with the game environment.
 * That is it moves on top of a board and can collide with solid
 * objects in the game world. 
 *
 * An brick actor is an actor based on the solid object brick. 
 *
 */


define(function(require) {
	var Brick = require('modules/brick');
	var BrickActor = function () {	
		// BETA for taking care of transposing the coordinates correctly
		this.init = function(cxt) {
			this._super(cxt);
		};
		this.draw = function() {
			var size = this.size;
			var x = size + this.pos.x + this.pos.y; 
			var y = 0.5*this.pos.x - 0.5*this.pos.y + 20*(15 - this.pos.z); 
			// The last positioning variable for y must be made more dynamic.
			// It should adjust according the Height of the canvas
			// Function:
			// 		brick_height * (board_height - brick_level)		
			this._super(x,y);
		};
		return this;
	};
	return  Brick.extend(new BrickActor());
});
