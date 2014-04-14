var socket = io.connect("http://localhost"); //remember to change this for deployment
var clientID;

socket.on('assign-id', function(data) {
	clientID = data['clientID'];
	socket.emit('client-event', { client: 'data'});
});

$('body').mousemove(function(event) {
	socket.emit('clientMousemove', { 'clientID': clientID, mouseX: event.pageX, mouseY: event.pageY});
});

socket.on('serverMousemove', function(data) {
	console.log(data);
	if(data.clientID / 2 == clientID / 2 && data.clientID != clientID) {
		$('#cursor').css({'left': data.mouseX + 30, 'top': data.mouseY});
	}
});