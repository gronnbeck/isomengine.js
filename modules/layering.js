/*
 * Layering is a module that adds layers to the view and registers 
 * them to the game engine. 
 *
 * Version: Alpha (Under development)
 *
 * Author: Ken Gronnbeck 
 * 
 */
define(function (require) {
	var $ = require('jquery');
	return function () {
		var NO_LAYERS = 3;
		var WIDTH = 800;
		var HEIGHT = 600;
		var layersHtml = "";
		for (var i = 0; i < NO_LAYERS; i++) {
			layersHtml +=  "<canvas id='layer-" + i + 
				"' width='"+ WIDTH +"' height='"+ HEIGHT +"'></canvas>"; 
		}
     	$('body').html(layersHtml);
		// TODO: Must fix that the CSS/style is also appends (z-index)
		var	layers = [];
		for (var i = 0; i < NO_LAYERS; i ++) {
			var canvas = document.getElementById("layer-" + i);
			layers.push(canvas.getContext("2d"));
		}	
		return layers;
	};
});
