var express = require('express'),
	path = require('path'),
	mongoose = require('mongoose'),
	models = require('./models');

var app = express();


var port = Number(process.env.PORT || 8000);
console.log('Express server listening to port' + port);

//Points express to a folder where static files are kept
app.use(express.static(path.normalize(__dirname)));

//Tell express to use its built in error handler
app.use(express.errorHandler());

var uristring = process.env.MONGOLAB_URI || "mongodb://heroku_app22105150:rnpqbsihbcso0qorfjmao4tig9@ds037407.mongolab.com:37407/heroku_app22105150";

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

require('./routes')(app);

mongoose.connect(uristring, function(err, res) {
	if (err) {
		console.log("Error: " + err);
	}
	var port = Number(process.env.PORT || 8000);
	app.listen(port);
	console.log('App listening on port: ' + port);
});


/*app.get('/', function(req, res) {
	res.send('Welcome to CS 1501');
});*/