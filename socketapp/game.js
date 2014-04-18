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
$(document).mousemove(function(event) {
	if (mouseCounter++ > 2) {
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
	//if (data.clientID != clientID) {
		$('#cursor').animate({
			'left': data.mouseX,
			'top': data.mouseY
		}, data.duration, 'linear');
	//}
});

$('#send-canvas').click(function(event) {
	console.log()
	socket.emit('fillCanvas', {
		'clientID': clientID,
		url: canvas.toDataURL()
	});
});

socket.on('fillCanvas', function(data) {
	console.log(data);
	var img = new Image();
	img.src = data.url;
	//if (data.clientID != clientID) {
		context.drawImage(img, 0, 0);
	//}
});

function brushChange(type, change) {
	socket.emit('brushChange', {
		'clientID': clientID,
		type: change
	});
}

socket.on('brushChange', data) {
	if(type == 'color') {
		color = data.type;
	} else if (type == 'weight') {
		weight = data.type;
	}
}