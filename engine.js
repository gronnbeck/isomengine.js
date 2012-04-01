require(['board.js'], function(b) {

b.init();
var board = b.init();

CURRENT = { 'x': 50, 'y': 0, 'z': 0 }
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

var drawTiles = function(cxt) {
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) { 
			for (var k = 0; k < board[i][j].length; k++) {		
				if (board[i][j][k] == 0) {
					continue;
				}
				betabox(10*(i + 1) + 10*j,  
					10*i*0.5 - 5*j + (300 - 10*k), 
					10);	
			};
		};
	};
};

var drawBoard = function(cxt) {
	drawTiles(cxt);	
};

var BOX_CONTEXT;

var redraw = function() {
	BOX_CONTEXT.clearRect(0, 0, WIDTH, HEIGHT);
//	layers[2].clearRect(0, 0, WIDTH, HEIGHT);
	drawBoard(layers[0]);
	BOX_CONTEXT.fillStyle = "#ff00c6";
	BOX_CONTEXT.strokeStyle = "#000";
	box(BOX_CONTEXT, 10 + CURRENT.x + CURRENT.y, 0.5*CURRENT.x - 0.5*CURRENT.y + 20*(15 - CURRENT.z), 10);
};


var speed = 5;
function doKeyDown(evt) {
	if (falling) return;

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
var onGround = function() {
	x = Math.round(CURRENT.x/10);
	y = Math.round(CURRENT.y/10);
	z = Math.round(CURRENT.z/10);
	if (x >= 0 && y >= 0 && z >= 0 
		&& x < DIMENSIONS.x && y < DIMENSIONS.y && z < DIMENSIONS.z) {
		return board[x][y][z] == 1;
	}
//	console.log(x + ", " + y + ", " + z);
	return false;
};

falling = false;
var next = function() {
	if (falling) {
		CURRENT.z -= 0.3;
	}
	if (onGround()) {
		return;
	}
	falling = true;
	BOX_CONTEXT.clearRect(0, 0, WIDTH, HEIGHT);
	BOX_CONTEXT = layers[0];
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
	BOX_CONTEXT = layers[2];
	redraw();

	window.setInterval(function() { next(); redraw(); }, 
		100/12); 
	
	window.addEventListener('keydown', doKeyDown, true);
};

});


