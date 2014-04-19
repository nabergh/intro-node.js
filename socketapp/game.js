var socket = io.connect("nabergh.herokuapp.com");
var oppID; //opponent's socket id

socket.on('connect', function(data) {
	socket.emit('opponent-searching');
});

socket.on('opponent-found', function(data) {
	oppID = data['oppID'];
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
			'oppID': oppID,
			mouseX: event.pageX - offX,
			mouseY: event.pageY - offY,
			'duration': duration
		});
		mouseCounter = 0;
	}
});

socket.on('serverMousemove', function(data) {
	$('#cursor').animate({
		'left': data.mouseX + offX - weight / 2,
		'top': data.mouseY + offY - weight / 2
	}, data.duration, 'linear');
});

$('#send-canvas').click(function(event) {
	console.log()
	socket.emit('fillCanvas', {
		'oppID': oppID,
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
		'oppID': oppID,
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
	if (color == 'rgb(255, 255, 255)') {
		cursor.css('border', 'solid black 1px');
	} else {
		cursor.css('border', 'none');
	}
	$('#cursor').append(cursor);
};

$('canvas').mousedown(function() {
	socket.emit('startPaint', {
		'oppID': oppID
	});
});
$(document).mouseup(function() {
	socket.emit('endPaint', {
		'oppID': oppID
	});
});

socket.on('startPaint', function(data) {
	$('#cursor').children().addClass('painting');
});

socket.on('endPaint', function(data) {
	$('#cursor').children().removeClass('painting');
});