define(function () {
	// Should move this function into a helper module
	var top = function(cxt, x, y, size, color) {
		cxt.fillStyle = color;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x-size, y+size*0.5);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x+size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};	

	var left = function(cxt, x, y, size, color) {
		cxt.fillStyle = color;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x+size, y+size*1.5);
		cxt.lineTo(x+size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};

	var right = function(cxt, x, y, size, color) {
		cxt.fillStyle = color;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x-size, y+size*1.5);
		cxt.lineTo(x-size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};

	return function (cxt) {
		this.strokeStyle = "#000";
		this.leftStyle = "#000";
		this.rightStyle = "#000";
		this.topStyle = "#000";
		this.leftLayer = cxt;
		this.rightLayer = cxt;
		this.topLayer = cxt;
		this.size = 10;
		this.pos = { 'x': 0, 'y': 0, 'z': 0 }; 
		this.speed = { 'x': 0, 'y': 0, 'z': 0 };
		// In lack of a better place to put it.
		// Moved it from engine.js. However, I don't like that a method
		// which is dependet upon board (and board again are dependent on this module)
		// is in this class. However, to write brick.onGround looks very neat. 
		// We'll see if a better place to moved this method appears.
		this.onGround = function(board, phys) {
			var brick = this;
			x = Math.round(this.pos.x/this.size);
			y = Math.round(this.pos.y/this.size);
			z = Math.round(this.pos.z);
			if (x >= 0 && y >= 0 && z >= 0 
				&& x < board.DIMENSIONS.x && y < board.DIMENSIONS.y && z < board.DIMENSIONS.z) {
				if (board.board[x][y][z] == 1) {
					phys.get(this).addTempForce('inv_gravity');
					return true;
				} 
				else {
					return false;
				}
			}
			return false;
		};
		this.draw = function(x, y) {
			var size = this.size;
			cxt.strokeStyle = this.strokeStyle;
			left(this.leftLayer, x-size, y-size*0.5, size, this.leftStyle);
			right(this.rightLayer, x+size, y-size*0.5, size, this.rightStyle);
			top(this.topLayer, x, y-size, size, this.topStyle);
		};
		this.clearRect = function(x, y, w, h) {
			this.topLayer.clearRect(x, y, w, h);
			this.leftLayer.clearRect(x, y, w, h);
			this.rightLayer.clearRect(x, y, w, h);
		};
		this.update = function () {
			for (key in this.speed) {
				this.pos[key] += this.speed[key];
			}
		};
	};
});
