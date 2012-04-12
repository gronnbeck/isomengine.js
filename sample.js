define(function (require) {
	return function SampleGame() {
		var engine = require('engine');
		this.run = function() {
			console.log('Running');
		};
	};
});
