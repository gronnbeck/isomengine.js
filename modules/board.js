define(function(require) {
	var brick = require('modules/brick');

	var TILE_SIZE = 10;
	var TILE_HEIGHT = TILE_SIZE; // Assuming Cube
	
	var Board = function() {
		this.init = function() {
			this.DIMENSIONS = { 'x': 30, 'y': 30, 'z': 15 };
			this.board = {};
			this.board = new Array(this.DIMENSIONS.x);
			for (var i = 0; i < this.DIMENSIONS.x; i++) {
				this.board[i] = new Array(this.DIMENSIONS.y);
				for (var j = 0; j < this.DIMENSIONS.y; j ++) {
					this.board[i][j] = new Array(this.DIMENSIONS.z);
					for (var k = 0; k < this.DIMENSIONS.z; k++) {
						this.board[i][j][k] = 0;
					};
				};
			};
		};

		this.draw = function(layers) {
			c = new brick(layers[0]);
			c.strokeStyle = "#563500";
			c.topStyle = "#888";
			c.leftStyle = "#3d2602";
			c.rightStyle = c.leftStyle;
			c.topLayer = layers[1];

			for (var i = 0; i < this.board.length; i++) {
				for (var j = 0; j < this.board[i].length; j++) { 
					for (var k = 0; k < this.board[i][j].length; k++) {		
						if (this.board[i][j][k] == 0) {
							continue;
						}
						c.draw(TILE_SIZE*(i + 1) + TILE_SIZE*j,  
							TILE_SIZE*i*0.5 - TILE_SIZE*0.5*j + (300 - TILE_HEIGHT*k));	
					};
				};
			};
		};
	};

	return Class.extend(new Board());
});
