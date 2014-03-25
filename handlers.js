module.exports.index = function(req, res) {
	res.send('Welcome to CS 1501');
}

module.exports.watch = function(req, res) {
	var video_id = req.query.v;
	res.render('watch', { id: video_id }, function(err, html) {
		res.send(html);
	});
}

module.exports.connect4 = function(req, res) {
	res.render('connect4', {}, function(err, html) {
		res.send(html);
	});
}

var mongoose = mongoose || require('mongoose'), Pin = mongoose.model("Pin");

module.exports.pinterless = function(req, res) {
	Pin.find({}, function(err, all_pins) {
		res.render('pinterless', { pins: all_pins }, function(err, html) {
			res.send(html);
		})
		res.send("Pins: " + JSON.stringify(all_pins));
	});
}

exports.createPin = function(req, res) {

	var newPin= new Pin({
		title: req.body.title,
		description: req.body.description,
		image_url: req.body.image_url
	});
	newPin.save(function(err) {
		if(err) {
			console.log("Error saving pin: " + err)
		} else {
			res.redirect('/pinterless');
		}
	})
}