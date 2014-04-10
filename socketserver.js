var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(8088);

//Points express to a folder where static files are kept
app.use(require("express").static(__dirname + "/socketapp"));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/socketapp/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.emit('server-event', { hello: 'world'});
	socket.on('client-event', function (data) {
		console.log(data);
	});
});