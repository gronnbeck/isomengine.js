define(function (require) {
	var Engine = require('engine');
	var Layering = require('modules/layering');
	return function SampleGame() {
		var layers = Layering();
		var engine = new Engine(layers);
		this.run = function() {
			engine.run();
    		console.log('Running');
		};
	};
});
