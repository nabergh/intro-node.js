var mongoose = mongoose || require('mongoose');

var pinSchema = mongoose.Schema({
	title: String,
	description: String,
	image_url: String,
	data: {
		type: Date,
		default: Date.now
	}
});

pinSchema.methods.print_out = function() {
	var output = JSON.stringify(this);
	console.log(output);
	return output;
}

pinSchema.statics.findByTitle = function(title, cb) {
	this.find({title: new RegExp(title, 'i')}, cb);
}

var Pin = mongoose.model('Pin', pinSchema);