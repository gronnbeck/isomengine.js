require(['board.js', 'cube.js'], function(board, cube) {

board.init();
var cube;
WIDTH = 800;
HEIGHT = 600;

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

var betabox = function(x,y,size) {
	layers[0].strokeStyle = "#563500";
	layers[0].fillStyle = "#3d2602";
	left(layers[0], x-size, y-size*0.5, size);
	right(layers[0], x+size, y-size*0.5, size);
	layers[1].fillStyle = "#888";
	layers[1].strokeStyle = "#777";
	tile(layers[1], x, y-size, size);
};

var BOX_CONTEXT;

var redraw = function() {
	cube.topLayer.clearRect(0, 0, WIDTH, HEIGHT);
	cube.leftLayer.clearRect(0, 0, WIDTH, HEIGHT);
	cube.rightLayer.clearRect(0, 0, WIDTH, HEIGHT);
	if (falling) board.draw(layers, betabox);
	cube.draw(10 + cube.POS.x + cube.POS.y, 
		0.5*cube.POS.x - 0.5*cube.POS.y + 20*(15 - cube.POS.z), 
		10);
};


var speed = 5;
function doKeyDown(evt) {
	if (falling) return;

	switch (evt.keyCode) {
	case 38:
		cube.POS.y += speed;
		cube.POS.x -= speed;
		break;
	case 40:
		cube.POS.y -= speed;
		cube.POS.x += speed;
		break;
	case 37:
		cube.POS.x -= speed;
		cube.POS.y -= speed;
		break;
	case 39:
		cube.POS.x += speed;
		cube.POS.y += speed;
		break;
	}
};


// init the bottom floor for testing
for (var i = 0; i < board.DIMENSIONS.x; i++) {
	for (var j = 0; j < board.DIMENSIONS.y; j++) {
		if (i >= 10 && i <= 15 
			&& j >= 10 && j <= 15)
			continue;
			board.board[i][j][0] = 1;
	};
};


box_height = 25;
var onGround = function() {
	x = Math.round(cube.POS.x/10);
	y = Math.round(cube.POS.y/10);
	z = Math.round(cube.POS.z/10);
	if (x >= 0 && y >= 0 && z >= 0 
		&& x < board.DIMENSIONS.x && y < board.DIMENSIONS.y && z < board.DIMENSIONS.z) {
		return board.board[x][y][z] == 1;
	}
	return false;
};

falling = false;
var next = function() {
	if (falling) {
		cube.POS.z -= 0.3;
	}
	if (onGround()) {
		return;
	}
	falling = true;
	// Add logic for falling behind the board
	cube.topLayer.clearRect(0, 0, WIDTH, HEIGHT);
	cube.leftLayer.clearRect(0, 0, WIDTH, HEIGHT);
	cube.rightLayer.clearRect(0, 0, WIDTH, HEIGHT);
	cube.topLayer = layers[0];
	cube.leftLayer = layers[0];
	cube.rightLayer = layers[0];
}

layers = [];

window.onload = function () {
	var layer0 = document.getElementById("layer-0");
	var layer1 = document.getElementById("layer-1");
	var layer2 = document.getElementById("layer-2");
	var cxt0 = layer0.getContext("2d");
	var cxt1 = layer1.getContext("2d");
	var cxt2 = layer2.getContext("2d");
	layers.push(cxt0);
	layers.push(cxt1);
	layers.push(cxt2);

	cube = new cube(cxt2);
	cube.topStyle = "#ff00c6";
	cube.leftStyle = cube.topStyle;
	cube.rightStyle = cube.leftStyle;

	BOX_CONTEXT = layers[2];
	board.draw(layers, betabox);

	redraw();

	window.setInterval(function() { next(); redraw(); }, 
		100/12); 
	
	window.addEventListener('keydown', doKeyDown, true);
};

});


