canvas = document.getElementById('drawingBoard');
context = canvas.getContext('2d');

var isPainting = false;
var offsetLeft = $('canvas').offset().left;
var offsetTop = $('canvas').offset().top;
$('canvas').mousedown(function(e) {
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;

	isPainting = true;
	addClick(e.pageX - offsetLeft, e.pageY - offsetTop);
	draw();
}).mousemove(function(e) {
	if (isPainting) {
		addClick(e.pageX - offsetLeft, e.pageY - offsetTop, true);
		draw();
	}
}).mouseup(function(e) {
	isPainting = false;
}).mouseleave(function(e) {
	isPainting = false;
});

var clickX, clickY, clickDrag, colors, weights;

function resetTools() {
	clickX = [];
	clickY = [];
	clickDrag = [];
	colors = [];
	weights = [];
}

resetTools();
var color = 'black';
var weight = 5;

function addClick(x, y, isDragging) {
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(isDragging);
	colors.push(color);
	weights.push(weight);
}

function draw() {
	context.lineJoin = "round";

	var i = clickX.length - 1
	context.strokeStyle = colors[i];
	context.lineWidth = weights[i];
	context.beginPath();
	if (clickDrag[i] && i) {
		context.moveTo(clickX[i - 1], clickY[i - 1]);
	} else {
		context.moveTo(clickX[i] - 1, clickY[i]);
	}
	context.lineTo(clickX[i], clickY[i]);
	context.closePath();
	context.stroke();

}

function clear() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

$('.color-pick').click(function(e) {
	color = $(this).css('background-color');
});

$('.weight-pick').each(function() {
	var weight = $(this).attr('weight');
	$(this).css({
		'width': weight,
		'height': weight,
		'border-radius': weight + 'px'
	});
});

$('.weight-pick').click(function(e) {
	weight = $(this).attr('weight');
});

$('#clear').click(function(e) {
	resetTools();
	clear();
	draw();
})