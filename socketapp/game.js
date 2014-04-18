var socket = io.connect("nabergh.herokuapp.com");
var clientID;

socket.on('assign-id', function(data) {
	clientID = data['clientID'];
	socket.emit('client-event', {
		client: 'data'
	});
});

var mouseCounter = 0;
var prevTime = Date.now();
var duration, currTime;
$('body').mousemove(function(event) {
	if (mouseCounter++ > 1) {
		currTime = Date.now();
		duration = Math.min(currTime - prevTime, 30);
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
	//console.log(data);
	if (data.clientID != clientID) {
		$('#cursor').animate({
			'left': data.mouseX,
			'top': data.mouseY
		}, data.duration, 'linear');
	}
});

$('#send-canvas').click(function(event) {
	console.log()
	var img = {};
	img.src = canvas.toDataURL();
	socket.emit('fillCanvas', {
		'clientID': clientID,
		image: img
	});
})

socket.on('fillCanvas', function(data) {
	console.log(data);
	if (data.clientID != clientID) {
		$('canvas').getContext('2d').drawImage(data.image, 0, 0);
	}
})