window.onload = function () {
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	var tile = function(cxt, x, y, size) {
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x-size, y+size*0.5);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x+size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};

	context.fillStyle = "#888";
	context.strokeStyle = "#777"
	for (var i = 0; i < 10; i++) {
		tile(context, 10*(i+1), 10*i*0.5, 10);
	};

	for (var i = 4; i < 9; i++) {
		for (var j = 0; j < 5; j++) { 
			tile(context, 10*(i+1)+20+10*j,  10*i*0.5-5*j, 10);
		}
	};
};
