var express = require('express'),
	path = require('path');

var app = express();

require('./routes')(app);

var port = Number(process.env.PORT || 8000);
console.log('Express server listening to port' + port);

//Points express to a folder where static files are kept
app.use(express.static(path.normalize(__dirname)));

//Tell express to use its built in error handler
app.use(express.errorHandler());

app.configure(function() {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
})

//These 3 lines tell express that we are going to be rendering
//html files held in the public directory which should be in
//same directory as this file
app.set('views', path.normalize(__dirname));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.listen(port);

/*app.get('/', function(req, res) {
	res.send('Welcome to CS 1501');
});*/