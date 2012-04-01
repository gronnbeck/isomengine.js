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
	return this;
});
