define(function(require) {
	var brick = require('modules/brick');

	var TILE_SIZE = 10;
	var TILE_HEIGHT = TILE_SIZE; // Assuming Cube
	
	var board = {};
	board.DIMENSIONS = { 'x': 30, 'y': 30, 'z': 15 };
	board.board = {};
	board.board = new Array(board.DIMENSIONS.x);
	for (var i = 0; i < board.DIMENSIONS.x; i++) {
		board.board[i] = new Array(board.DIMENSIONS.y);
		for (var j = 0; j < board.DIMENSIONS.y; j ++) {
			board.board[i][j] = new Array(board.DIMENSIONS.z);
			for (var k = 0; k < board.DIMENSIONS.z; k++) {
				board.board[i][j][k] = 0;
			};
		};
	};

	board.draw = function(layers) {
		c = new brick(layers[0]);
		c.strokeStyle = "#563500";
		c.topStyle = "#888";
		c.leftStyle = "#3d2602";
		c.rightStyle = c.leftStyle;
		c.topLayer = layers[1];

		for (var i = 0; i < board.board.length; i++) {
			for (var j = 0; j < board.board[i].length; j++) { 
				for (var k = 0; k < board.board[i][j].length; k++) {		
					if (board.board[i][j][k] == 0) {
						continue;
					}
					c.draw(TILE_SIZE*(i + 1) + TILE_SIZE*j,  
						TILE_SIZE*i*0.5 - TILE_SIZE*0.5*j + (300 - TILE_HEIGHT*k));	
				};
			};
		};
	};

	return board;
});
