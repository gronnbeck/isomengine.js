define(function() {
	var board = {};

	var TILE_SIZE = 10;
	var TILE_HEIGHT = TILE_SIZE; // Assuming Cube
	board.DIMENSIONS = { 'x': 30, 'y': 30, 'z': 15 };
	board.board = {};
	board.init = function() { // Maybe this method should not have to be called explicitly?
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
		return board;
	};

	
	board.draw = function(cxt, tile) {
		for (var i = 0; i < board.board.length; i++) {
			for (var j = 0; j < board.board[i].length; j++) { 
				for (var k = 0; k < board.board[i][j].length; k++) {		
					if (board.board[i][j][k] == 0) {
						continue;
					}
					tile(TILE_SIZE*(i + 1) + TILE_SIZE*j,  
						TILE_SIZE*i*0.5 - TILE_SIZE*0.5*j + (300 - TILE_HEIGHT*k), 
						TILE_SIZE);	
				};
			};
		};
	};

	return board;
});
