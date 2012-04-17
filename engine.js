define(function(require) {
	// TODO Adding board and brick to the game should be done from
	// the GameSample module (or maybe a class that GameSample uses)
	// But should definitely not be spesified in the engine
	var board = require('modules/board');
	var brick = require('modules/brick');
	var physics = require('modules/physics');

	var Engine = function Engine(layers) {
		var phys = new physics();

		var redraw = function() {
			brick.clearRect(0, 0, WIDTH, HEIGHT);
			if (falling) board.draw(layers);
			// TODO The transposing of a brick should be moved in to the
			// brick.draw()-method itself, and should not be explicitly typed here.
			// Have to be careful when doing this refactoring. Board.js is also 
			// dependent upon brick.draw, and will also be affected by this change.
			// Probably have to change the brick.onGround() function as well. 
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
					object.speed.z += 1.5; 
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
