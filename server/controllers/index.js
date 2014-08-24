module.exports = function (server) {
	server.get('/', function (req, res, next) {
		res.render('index');
	});
};