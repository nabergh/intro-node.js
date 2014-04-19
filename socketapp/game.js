var socket = io.connect("nabergh.herokuapp.com");
var clientID;

socket.on('assign-id', function(data) {
	clientID = data['clientID'];
	updateCursor(color, weight);
});

var mouseCounter = 0;
var prevTime = Date.now();
var duration, currTime;
var painter = $('#painter');
var offX = painter.offset().left;
var offY = painter.offset().top;
painter.mousemove(function(event) {
	if (mouseCounter++ > 2) {
		currTime = Date.now();
		duration = Math.min(currTime - prevTime, 30);
		prevTime = currTime;
		socket.emit('clientMousemove', {
			'clientID': clientID,
			mouseX: event.pageX - offX,
			mouseY: event.pageY - offY,
			'duration': duration
		});
		mouseCounter = 0;
	}
});

socket.on('serverMousemove', function(data) {
	$('#cursor').animate({
		'left': data.mouseX - weight / 2,
		'top': data.mouseY - weight / 2
	}, data.duration, 'linear');
});

$('#send-canvas').click(function(event) {
	console.log()
	socket.emit('fillCanvas', {
		'clientID': clientID,
		url: canvas.toDataURL()
	});
});

socket.on('fillCanvas', function(data) {
	var img = new Image();
	img.src = data.url;
	context.drawImage(img, 0, 0);
});

function brushChange(c, w) {
	socket.emit('brushChange', {
		'clientID': clientID,
		'color': c,
		'weight': w
	});
}

socket.on('brushChange', function(data) {
	updateCursor(data.color, data.weight);
});

function updateCursor(color, weight) {
	$('#cursor').empty();
	var cursor = $('.weight-pick').filter(function(index) {
		return $(this).attr('weight') == weight;
	}).clone();
	cursor.css('background-color', color);
	if(color == 'rgb(255, 255, 255)') {
		cursor.css('border', 'solid black 1px');
	} else {
		cursor.css('border', 'none');
	}
	$('#cursor').append(cursor);
};

$('canvas').mousedown(function() {
	socket.emit('startPaint', {
		'clientID': clientID
	});
});
$(document).mouseup(function() {
	socket.emit('endPaint', {
		'clientID': clientID
	});
});

socket.on('startPaint', function(data) {
	$('#cursor').children().addClass('painting');
});

socket.on('endPaint', function(data) {
	$('#cursor').children().removeClass('painting');
});