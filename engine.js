require(['board.js', 'brick.js'], function(board, brick) {

WIDTH = 800;
HEIGHT = 600;
var redraw = function() {
	brick.clearRect(0, 0, WIDTH, HEIGHT);
	if (falling) board.draw(layers);
	brick.draw(10 + brick.POS.x + brick.POS.y, 
		0.5*brick.POS.x - 0.5*brick.POS.y + 20*(15 - brick.POS.z), 
		10);
};


var speed = 5;
function doKeyDown(evt) {
	if (falling) return;

	switch (evt.keyCode) {
	case 38:
		brick.POS.y += speed;
		brick.POS.x -= speed;
		break;
	case 40:
		brick.POS.y -= speed;
		brick.POS.x += speed;
		break;
	case 37:
		brick.POS.x -= speed;
		brick.POS.y -= speed;
		break;
	case 39:
		brick.POS.x += speed;
		brick.POS.y += speed;
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
	x = Math.round(brick.POS.x/10);
	y = Math.round(brick.POS.y/10);
	z = Math.round(brick.POS.z/10);
	if (x >= 0 && y >= 0 && z >= 0 
		&& x < board.DIMENSIONS.x && y < board.DIMENSIONS.y && z < board.DIMENSIONS.z) {
		return board.board[x][y][z] == 1;
	}
	return false;
};

falling = false;
var next = function() {
	if (falling) {
		brick.POS.z -= 0.3;
	}
	if (onGround()) {
		return;
	}
	falling = true;
	brick.clearRect(0,0, WIDTH, HEIGHT);
	brick.topLayer = layers[0];
	brick.leftLayer = layers[0];
	brick.rightLayer = layers[0];
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

	brick = new brick(cxt2);
	brick.topStyle = "#ff00c6";
	brick.leftStyle = brick.topStyle;
	brick.rightStyle = brick.leftStyle;

	board.draw(layers);

	redraw();

	window.setInterval(function() { next(); redraw(); }, 
		100/12); 
	
	window.addEventListener('keydown', doKeyDown, true);
};

});


