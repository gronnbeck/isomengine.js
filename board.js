define(function() {
	DIMENSIONS = { 'x': 30, 'y': 30, 'z': 15 };
	this.board = {};
	this.init = function() {
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
					tile(10*(i + 1) + 10*j,  
						10*i*0.5 - 5*j + (300 - 10*k), 
						10);	
				};
			};
		};
	};

	return this;
});
