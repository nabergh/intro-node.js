var express = require('express');

var app = express();
var port = 8000;
app.listen(8000);

console.log('Express server listening to port' + port);

app.get('/', function(req, res) {
	res.send('Welcome to CS 1501');
});