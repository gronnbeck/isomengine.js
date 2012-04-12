require(['engine.js', 'config.js'], function (engine, config) {
	var game = new config.game(engine);	
	window.onload = function() {
		game.run();
	}
});
