var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(process.env.PORT || 8088);

//Points express to a folder where static files are kept
app.use(require("express").static(__dirname + ""));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

var playerQueue = [];

io.sockets.on('connection', function (socket) {
	socket.on('opponent-searching', function() {
		if(playerQueue.length == 0) {
			playerQueue.push(socket.id);
		}
		else {
			var oppID;
			while(io.sockets.sockets[oppID] === undefined)
				oppID = playerQueue.shift();
			io.sockets.socket(oppID).emit('opponent-found', {'oppID': socket.id});
			io.sockets.socket(socket.id).emit('opponent-found', {'oppID': oppID});
		}
	})
	socket.on('clientMousemove', function(data) {
		io.sockets.socket(data.oppID).emit('serverMousemove', data);
	});
	socket.on('fillCanvas', function(data) {
		io.sockets.socket(data.oppID).emit('fillCanvas', data);
	});
	socket.on('brushChange', function(data) {
		io.sockets.socket(data.oppID).emit('brushChange', data);
	});
	socket.on('startPaint', function(data) {
		io.sockets.socket(data.oppID).emit('startPaint', data);
	});
	socket.on('endPaint', function(data) {
		io.sockets.socket(data.oppID).emit('endPaint', data);
	});
});
