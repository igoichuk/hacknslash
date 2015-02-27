
// load the bid model
var Bid = require('../model/bid');


 // GET api/bids
exports.getBids = function (req, res) {
	
	// use mongoose to get all bids in the database
	getAllBids(res, req.query.user);
};

// POST api/bids
exports.createBid = function(req, res) {

	// create a bid, information comes from AJAX request from Angular
	Bid.create({
		name : req.body.name,
		price: req.body.price,
		user : req.user.local.email
	}, function(err, todo) {
		if (err)
			res.send(err);

		// return all the bids after you create another
		getAllBids(res);
	});
};

// DELETE api/bid/{id}
exports.deleteBid = function(req, res) {

	Bid.remove({
		_id : req.params.bid_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		// return all the bids after you create another
		getAllBids(res);
	});
};
	
function getAllBids(res, userFilter){
	
	if (userFilter != undefined) {
		Bid.find({ user: userFilter }, function (err, bids) {
			if (err)
				res.send(err)
			res.json(bids); // return all bids in JSON format
		});
		return;
	}

	Bid.find(function(err, bids) {
		if (err)
			res.send(err)
		res.json(bids); // return all bids in JSON format
	});
}
