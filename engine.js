define(function(require) {
	var board = require('modules/board');
	var brick = require('modules/brick');
	var physics = require('modules/physics');

	var Engine = function Engine(layers) {
		// TODO: Make this a class. Then merge with master
		var phys = new physics();

		var redraw = function() {
			brick.clearRect(0, 0, WIDTH, HEIGHT);
			if (falling) board.draw(layers);
			brick.draw(10 + brick.pos.x + brick.pos.y, 
				0.5*brick.pos.x - 0.5*brick.pos.y + 20*(15 - brick.pos.z));
		};

		this.run = function() {
			// TODO: find a better way to find and handle layers and cxts
			brick = new brick(layers[2]);
			brick.topStyle = "#ff00c6";
			brick.leftStyle = brick.topStyle;
			brick.rightStyle = brick.leftStyle;
			phys.register(brick, true, [physics.forces.gravity]);
			board.draw(layers);
			redraw();

			window.setInterval(function() { next(); redraw(); }, 
				100/12); 
			
			window.addEventListener('keydown', doKeyDown, true);
		};
		WIDTH = 800;
		HEIGHT = 600;


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


		var falling = false;
		var next = function() {
			brick.update();
			// TODO: This method should be a part of some collision 
			// detection mechanism
			brick.onGround(board, phys);
			phys.tick();
		//	TODO reintroduce falling in another way. The falling semantics
		//	changed when I introduced physics and forces
		//	setFalling();
		}

		this.setFalling = function() {
		//	falling = true;
			brick.clearRect(0,0, WIDTH, HEIGHT);
			brick.topLayer = layers[0];
			brick.leftLayer = layers[0];
			brick.rightLayer = layers[0];
		};
	};
	return Engine;
});
