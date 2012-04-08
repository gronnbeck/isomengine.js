define(function () {
	var top = function(cxt, x, y, size, color) {
		cxt.fillStyle = color;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x-size, y+size*0.5);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x+size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};	

	var left = function(cxt, x, y, size, color) {
		cxt.fillStyle = color;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x+size, y+size*1.5);
		cxt.lineTo(x+size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};

	var right = function(cxt, x, y, size, color) {
		cxt.fillStyle = color;
		cxt.beginPath();
		cxt.moveTo(x,y);
		cxt.lineTo(x, y+size);
		cxt.lineTo(x-size, y+size*1.5);
		cxt.lineTo(x-size, y+size*0.5);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	};

	return function (cxt) {
		this.strokeStyle = "#000";
		this.leftStyle = "#000";
		this.rightStyle = "#000";
		this.topStyle = "#000";
		this.leftLayer = cxt;
		this.rightLayer = cxt;
		this.topLayer = cxt;
		this.POS = { 'x': 50, 'y': 0, 'z': 0 }; 
		this.draw = function(x, y, size) {
			cxt.strokeStyle = this.strokeStyle;
			left(this.leftLayer, x-size, y-size*0.5, size, this.leftStyle);
			right(this.rightLayer, x+size, y-size*0.5, size, this.rightStyle);
			top(this.topLayer, x, y-size, size, this.topStyle);
		};
		this.clearRect = function(x, y, w, h) {
			this.topLayer.clearRect(x, y, w, h);
			this.leftLayer.clearRect(x, y, w, h);
			this.rightLayer.clearRect(x, y, w, h);
		};
	};
});
