define(function (require) {
	var $ = require('jquery');
	return function () {
		var NO_LAYERS = 3;
		var layersHtml = "";
		for (var i = 0; i < NO_LAYERS; i++) {
			layersHtml +=  "<canvas id='layer-" + i + 
				"' width='800' height='600'></canvas>"; 
		}
     	$('body').html(layersHtml);
		// TODO: Must fix that the CSS/style is also appended (z-index)
		var	layers = [];
		for (var i = 0; i < NO_LAYERS; i ++) {
			var canvas = document.getElementById("layer-" + i);
			layers.push(canvas.getContext("2d"));
		}	
		return layers;
	};
});
