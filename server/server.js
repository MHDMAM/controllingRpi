var express = require('express');
var config = require('config');

var app = express();
var http = require('http').Server(app);

app.server = require('http').createServer(app);

require('./express')(app, config);

// require all controllers. 
var ctrlsPath = __dirname + '/controllers';
require('fs').readdirSync(ctrlsPath).forEach(function (file) {
	if (file.indexOf('.js') >= 0) {
		require(ctrlsPath + '/' + file)(app);
	}
});

app.server.listen(app.get('port'), function () {
	//and... we're live
	console.log('and... we are live');
});