define(function () {
	var top = function(cxt, x, y, size) {
		cxt.fillStyle = cube.topStyle;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x-size, y+size*0.5);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x+size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};

	var left = function(cxt, x, y, size) {
		cxt.fillStyle = cube.leftStyle;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x+size, y+size*1.5);
		cxt.lineTo(x+size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};

	var right = function(cxt, x, y, size) {
		cxt.fillStyle = cube.rightStyle;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x-size, y+size*1.5);
		cxt.lineTo(x-size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};

	cube = {};
	cube.strokeStyle = "#000";
	cube.leftStyle = "#000";
	cube.rightStyle = "#000";
	cube.topStyle = "#000";
	cube.CURRENT = { 'x': 50, 'y': 0, 'z': 0 }; 
	cube.draw = function(cxt, x, y, size) {
		cxt.strokeStyle = cube.strokeStyle;
		left(cxt, x-size, y-size*0.5, size);
		right(cxt, x+size, y-size*0.5, size);
		top(cxt, x, y-size, size);
	};
	
	return cube;
});
