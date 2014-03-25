module.exports = function(app) {
	var handlers = require('./handlers');
	app.get('/', handlers.index);
	app.get('/watch', handlers.watch);
	app.get('/connect4', handlers.connect4);
	app.get('/pinterless', handlers.pinterless);

	app.post('/pinterless', handlers.createPin);
}