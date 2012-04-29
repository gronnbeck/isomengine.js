require(['config/config.js'], function (config) {
	var game = new config.game();	
	window.onload = function() {
		game.run();
	}
});
