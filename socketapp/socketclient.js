var socket = io.connect("nabergh.herokuapp.com"); //remember to change this for deployment
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
	if(true && data.clientID != clientID) {//data.clientID / 2 == clientID / 2
		$('#cursor').css({'left': data.mouseX, 'top': data.mouseY});
	}
});