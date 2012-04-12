define(function () {
	return function SampleGame(engine) {
		this.engine = engine;
		this.run = function() {
			console.log('Running');
		};
	};
});
