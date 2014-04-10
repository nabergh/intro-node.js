var socket = io.connect("http://localhost");

socket.on('server-event', function(data) {
	alert(JSON.stringify(data));
	socket.emit('client-event', { client: 'data'});
});