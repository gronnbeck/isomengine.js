define(function (require) {
	var Engine = require('engine');
	return function SampleGame() {
		// TODO: Use jQuery or something to automate the finding of layers (create a module)
		var layers = [];
		var layer0 = document.getElementById("layer-0");
		var layer1 = document.getElementById("layer-1");
		var layer2 = document.getElementById("layer-2");
		var cxt0 = layer0.getContext("2d");
		var cxt1 = layer1.getContext("2d");
		var cxt2 = layer2.getContext("2d");
		layers.push(cxt0);
		layers.push(cxt1);
		layers.push(cxt2);

		var engine = new Engine(layers);
		this.run = function() {
			engine.run();
    		console.log('Running');
		};
	};
});
