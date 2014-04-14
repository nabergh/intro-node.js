var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(8088);

//Points express to a folder where static files are kept
app.use(require("express").static(__dirname + ""));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

var clientID = 0;

io.sockets.on('connection', function (socket) {
	socket.emit('assign-id', { "clientID": clientID++});
	socket.on('client-event', function (data) {
		console.log(data);
	});
	socket.on('clientMousemove', function(data) {
		socket.emit('serverMousemove', data);
	});
});
