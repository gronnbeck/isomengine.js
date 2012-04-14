define(function (require) {
	var Engine = require('engine');
	return function SampleGame() {
		var engine = new Engine();
		this.run = function() {
			console.log('Running');
			engine.run();
		};
	};
});
