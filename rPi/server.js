var io = require('socket.io-client').connect('http://localhost:3000');

var gpio = require('rpi-gpio');


/*------------------GPIOs------------------*/
var PIN12 = 12;
// init pin 12 to off.
gpio.setup(PIN12, gpio.DIR_OUT, function () {
	gpio.write(PIN12, false);
});



/*------------------Socket------------------*/

io.on('connect', function () {
	console.log('a user connected');

	io.on('changestate', function (state) {
		console.log('state', state);
		gpio.write(PIN12, state);
	});

});


/*------------------Clean UP------------------*/

// On app exit.
process.on('SIGNINT', function () {
	gpio.write(PIN12, false, function () {
		gpio.destroy(function () {
			console.log('PIN12 turn off.');
			process.exit(0);
		});
	})
});