DIMENSIONS = { 'x': 30, 'y': 30, 'z': 15 }
CURRENT = { 'x': 50, 'y': 0, 'z': 0 }

// init board
board = new Array(DIMENSIONS.x);
for (var i = 0; i < DIMENSIONS.x; i++) {
	board[i] = new Array(DIMENSIONS.y);
	for (var j = 0; j < DIMENSIONS.y; j ++) {
		board[i][j] = new Array(DIMENSIONS.z);
		for (var k = 0; k < DIMENSIONS.z; k++) {
			board[i][j][k] = 0;
		};
	};
};

var tile = function(cxt, x, y, size) {
	cxt.beginPath();
	cxt.moveTo(x,y);
	cxt.lineTo(x-size, y+size*0.5);
	cxt.lineTo(x, y+size);
	cxt.lineTo(x+size, y+size*0.5);
	cxt.closePath();
	cxt.fill();
	cxt.stroke();
};

var left = function(cxt, x, y, size) {
	cxt.beginPath();
	cxt.moveTo(x,y);
	cxt.lineTo(x, y+size);
	cxt.lineTo(x+size, y+size*1.5);
	cxt.lineTo(x+size, y+size*0.5);
	cxt.closePath();
	cxt.fill();
	cxt.stroke();
};

var right = function(cxt, x, y, size) {
	cxt.beginPath();
	cxt.moveTo(x,y);
	cxt.lineTo(x, y+size);
	cxt.lineTo(x-size, y+size*1.5);
	cxt.lineTo(x-size, y+size*0.5);
	cxt.closePath();
	cxt.fill();
	cxt.stroke();
};

var box = function(cxt, x, y, size) {
	left(cxt, x-size, y-size*0.5, size);
	right(cxt, x+size, y-size*0.5, size);
	tile(cxt, x, y-size, size);
};

var drawTiles = function(cxt) {
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) { 
			for (var k = 0; k < board[i][j].length; k++) {		
				if (board[i][j][k] == 0) {
					continue;
				}
				cxt.fillStyle = "#888";
				cxt.strokeStyle = "#777"
				tile(cxt, 
					10*(i + 1) + 10*j,  
					10*i*0.5 - 5*j + (300 - 10*k), 
					10);	
			};
		};
	};
};

var drawWalls = function(cxt) {
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			for (var k = 0; k < board[i][j].length; k++) {
				if (board[i][j][k] == 0) {
					continue;
				}

				// fix so it properly renders! 
				// as in: the whole need to have walls
				cxt.fillStyle = "#563500";
				cxt.strokeStyle = "#3d2602";
				if (i == 0) {
					left(cxt, 
						10*j, 
						5+5*j + (300 - 10*k), 
						10);
				}

				cxt.strokeStyle = cxt.fillStyle;
				cxt.fillStyle = "#6e4505";
				if (j == 0) {
					right(cxt, 
						2*10*board.length-10*i,
						5+5*i + (300 - 10*k), 
						10);
				}
	
			};
		};
	};

};

var drawBoard = function(cxt) {
	drawTiles(cxt);	
	drawWalls(cxt);
	cxt.fillStyle = "#ff00c6";
	cxt.strokeStyle = "#000";
	box(cxt, 10 + CURRENT.x + CURRENT.y, 0.5*CURRENT.x - 0.5*CURRENT.y + 20*(15 - CURRENT.z), 10);

};

var redraw = function(cxt, can) {
	cxt.clearRect(0, 0, can.width, can.height);
	drawBoard(cxt);
};


var speed = 5;
function doKeyDown(evt) {
	switch (evt.keyCode) {
	case 38:
		CURRENT.y += speed;
		CURRENT.x -= speed;
		break;
	case 40:
		CURRENT.y -= speed;
		CURRENT.x += speed;
		break;
	case 37:
		CURRENT.x -= speed;
		CURRENT.y -= speed;
		break;
	case 39:
		CURRENT.x += speed;
		CURRENT.y += speed;
		break;
	}
};


// init the bottom floor
for (var i = 0; i < board.length; i++) {
	for (var j = 0; j < board[i].length; j++) {
		if (i >= 10 && i <= 15 
			&& j >= 10 && j <= 15)
			continue;
			board[i][j][0] = 1;
	};
};




box_height = 25;
function onGround() {
	x = Math.round(CURRENT.x/10);
	y = Math.round(CURRENT.y/10);
	z = Math.round(CURRENT.z/10);
	if (x >= 0 && y >= 0 && z >= 0 
		&& x < DIMENSIONS.x && y < DIMENSIONS.y && z < DIMENSIONS.z) {
		return board[x][y][z] == 1;
	}
	console.log(x + ", " + y + ", " + z);
	return false;
}

falling = false;
function next() {
	if (falling) {
		CURRENT.z -= 0.3;
	}
	if (onGround()) {
		return;
	}
		falling = true;
}


window.onload = function () {
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	redraw(context, canvas);
	count = 1;

	window.setInterval(function() { next(); redraw(context, canvas); }, 
		100/24); 
	
	window.addEventListener('keydown', doKeyDown, true);
};



