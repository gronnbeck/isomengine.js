define(function() {
	var TILE_SIZE = 10;
	var TILE_HEIGHT = TILE_SIZE; // Assuming Cube
	this.DIMENSIONS = { 'x': 30, 'y': 30, 'z': 15 };
	this.board = {};
	this.init = function() { // Maybe this method should not have to be called explicitly?
		this.board = new Array(DIMENSIONS.x);
		for (var i = 0; i < DIMENSIONS.x; i++) {
			this.board[i] = new Array(DIMENSIONS.y);
			for (var j = 0; j < DIMENSIONS.y; j ++) {
				this.board[i][j] = new Array(DIMENSIONS.z);
				for (var k = 0; k < DIMENSIONS.z; k++) {
					this.board[i][j][k] = 0;
				};
			};
		};
		return this.board;
	};

	
	this.draw = function(cxt, tile) {
		for (var i = 0; i < this.board.length; i++) {
			for (var j = 0; j < this.board[i].length; j++) { 
				for (var k = 0; k < this.board[i][j].length; k++) {		
					if (this.board[i][j][k] == 0) {
						continue;
					}
					tile(TILE_SIZE*(i + 1) + TILE_SIZE*j,  
						TILE_SIZE*i*0.5 - TILE_SIZE*0.5*j + (300 - TILE_HEIGHT*k), 
						TILE_SIZE);	
				};
			};
		};
	};

	return this;
});
