define(function() {
	DIMENSIONS = { 'x': 30, 'y': 30, 'z': 15 };
	board = {};
	board.board = new Array(DIMENSIONS.x);
	board.init = function() {
		for (var i = 0; i < DIMENSIONS.x; i++) {
			board.board[i] = new Array(DIMENSIONS.y);
			for (var j = 0; j < DIMENSIONS.y; j ++) {
				board.board[i][j] = new Array(DIMENSIONS.z);
				for (var k = 0; k < DIMENSIONS.z; k++) {
					board.board[i][j][k] = 0;
				};
			};
		};
		return board.board;
	};
	return board;
});
