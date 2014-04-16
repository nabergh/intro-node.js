var socket = io.connect("nabergh.herokuapp.com"); //remember to change this for deployment
var clientID;

socket.on('assign-id', function(data) {
	clientID = data['clientID'];
	socket.emit('client-event', { client: 'data'});
});

var mouseCounter = 0;
var prevTime = Date.now();
var duration, currTime;
$('body').mousemove(function(event) {
	if(mouseCounter++ > 1) {
		currTime = Date.now();
		duration = currTime - prevTime;
		prevTime = currTime;
		socket.emit('clientMousemove', {
			'clientID': clientID,
			mouseX: event.pageX,
			mouseY: event.pageY,
			'duration': duration
		});
		mouseCounter = 0;
	}
});

socket.on('serverMousemove', function(data) {
	console.log(data);
	if(data.clientID != clientID) {//data.clientID / 2 == clientID / 2
		$('#cursor').animate({'left': data.mouseX, 'top': data.mouseY}, data.duration, 'linear');
	}
});
