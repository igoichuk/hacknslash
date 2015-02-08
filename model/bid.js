// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// Bids
module.exports = mongoose.model('Bid', {
	name : String,
	price : Number,
	date: { type: Date, default: Date.now }
});
