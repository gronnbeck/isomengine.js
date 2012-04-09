require(['board.js', 'brick.js', 'physics.js'],
	function(board, brick, physics) {
var phys;

WIDTH = 800;
HEIGHT = 600;
var redraw = function() {
	brick.clearRect(0, 0, WIDTH, HEIGHT);
	if (falling) board.draw(layers);
	brick.draw(10 + brick.pos.x + brick.pos.y, 
		0.5*brick.pos.x - 0.5*brick.pos.y + 20*(15 - brick.pos.z), 
		10);
};


var speed = 5;
function doKeyDown(evt) {
	if (falling) return;

	switch (evt.keyCode) {
	case 38:
		brick.pos.y += speed;
		brick.pos.x -= speed;
		break;
	case 40:
		brick.pos.y -= speed;
		brick.pos.x += speed;
		break;
	case 37:
		brick.pos.x -= speed;
		brick.pos.y -= speed;
		break;
	case 39:
		brick.pos.x += speed;
		brick.pos.y += speed;
		break;
	case 32:
		// a more natural way of introducing jumping.
		phys.get(brick).tempForces.push(function (object) {
			object.speed.z += 1; 
		});
		
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

// TODO: This method should be a part of some collision 
// detection mechanism
var onGround = function() {
	// we divide by BRICK_SIZE = 10
	x = Math.round(brick.pos.x/10);
	y = Math.round(brick.pos.y/10);
	z = Math.round(brick.pos.z);
	if (x >= 0 && y >= 0 && z >= 0 
		&& x < board.DIMENSIONS.x && y < board.DIMENSIONS.y && z < board.DIMENSIONS.z) {
		if (board.board[x][y][z] == 1) {
			phys.get(brick).tempForces.push(inv_gravity);
			return true;
		} 
		else {
			return false;
		}
	}
	return false;
};

var falling = false;
var next = function() {
	brick.update();
	onGround();
	phys.tick();
//	TODO reintroduce falling in another way. The falling semantics
//	changed when I introduced physics and forces
//	setFalling();
}

var setFalling = function() {
//	falling = true;
	brick.clearRect(0,0, WIDTH, HEIGHT);
	brick.topLayer = layers[0];
	brick.leftLayer = layers[0];
	brick.rightLayer = layers[0];
};

// example force (as for now). A force such sa gravity should just
// affect the speed of the object. Just like accerelation affects the
// speed of an object.
var gravity = function (object) {
	object.speed.z -= 0.3;
};
var inv_gravity = function (object) {
	object.speed.z += 0.3;
	if (object.speed.z < 0) {
		object.speed.z = 0;
		// a hack to fix the rounding errors. So the object lands on a 
		// "whole" value of z. Look into this later
		object.pos.z = Math.round(object.pos.z);
	}
};

layers = [];
window.onload = function () {
	phys = new physics;
	// TODO: find a better way to discover and handle layers and cxts
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
	phys.register(brick, true, [gravity]);
	board.draw(layers);

	redraw();

	window.setInterval(function() { next(); redraw(); }, 
		100/12); 
	
	window.addEventListener('keydown', doKeyDown, true);
};

});


