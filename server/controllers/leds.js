module.exports = function (server) {
	var io = require('socket.io')(server.server);

	io.on('connection', function (socket) {
		console.log('a user connected');

		socket.on('disconnect', function () {
			console.log('user disconnected');
		});

		socket.on('updateState', function (state) {
			console.log('updateState:', state);
			io.emit('changestate', state);
		});
	});

	// render leds view
	server.get('/leds', function (req, res, next) {
		res.render('leds/index');
	});

};