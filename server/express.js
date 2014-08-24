// Express Configuration.
// =====================

// Server dependencies
// -------------------
// ###NPM
// * Express.js
var express = require('express');
var colors = require('cli-color');
var path = require('path');

var error = colors.red.bold;
var notice = colors.blue.blink;
var info = colors.white.bold.underline;
var success = colors.green.bold;

console.log(info('\nCurrent environment is: ' + process.env.NODE_ENV));
console.log();

module.exports = function (app, config) {
	console.log(notice('\n|<<** Server Running on port: ' + config.server.port + ' **>>|'));
	console.log();

	//config express in all environments
	app.configure(function () {
		//settings
		app.disable('x-powered-by');
		app.set('port', config.server.port);
		app.set('views', __dirname + '/public/templates');
		app.set('view engine', 'jade');
		app.set('strict routing', true);
		app.set('project-name', config.app.projectName);
		app.set('company-name', config.app.companyName);
		app.set('system-email', config.app.systemEmail);
		app.set('crypto-key', config.app.cryptoKey);
		app.set('require-account-verification', false);

		// middleware
		app.use(express.favicon(__dirname + '/public/favicon.ico'));
		app.use(express.logger('dev'));


		// * Expose documentation.
		app.use('/docs', express.static(config.DOC_PATH));
		app.use('/docs', express.directory(config.DOC_PATH));

    app.use(express.methodOverride());

    app.use(express.bodyParser());
		// * Allow CORS
		app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, content-type");
			res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
			next();
		});

    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

		// * Enable JsonP
		app.enable("jsonp callback");
	});

	// config express in dev environment
	// Conditionally invoke callback when env matches <process.env.NODE_ENV>
	app.configure('development', function () {
		app.use(express.errorHandler());
	});
}