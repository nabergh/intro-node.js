var socket = io.connect("nabergh.herokuapp.com"); //remember to change this for deployment
var clientID;

socket.on('assign-id', function(data) {
	clientID = data['clientID'];
	socket.emit('client-event', { client: 'data'});
});

var mouseCounter = 0;
$('body').mousemove(function(event) {
	if(mouseCounter++ > 1) {
		socket.emit('clientMousemove', { 'clientID': clientID, mouseX: event.pageX, mouseY: event.pageY});
		mouseCounter = 0;
	}
});

var duration = 10;
function setAnimateDuration(dur) {
	duration = dur;
}

var prevX, prevY, diffX, diffY, distance,;
socket.on('serverMousemove', function(data) {
	console.log(data);
	diffX = data.mouseX - prevX;
	diffY = data.mouseY - prevY;
	distance = Math.sqrt(diffX*diffX + diffY*diffY);
	duration = 5 + distance / 30;
	$('#cursor').animate({'left': data.mouseX, 'top': data.mouseY}, duration, 'linear');
});
