// server.js

// Module dependencies
var express = require('express');
var routes = require('./routes');
var bidsApi = require('./routes/bids.js');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public'))); // process styl files into css
app.use(express.static(__dirname + '/public'));   // set the static files location /public/img will be /img for users  

// connect to mongoDB database on modulus.io
mongoose.connect('mongodb://localhost:27017/test');

// View routes
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

// REST api
app.get('/api/bids', bidsApi.getBids);
app.post('/api/bids', bidsApi.createBid);
app.delete('/api/bids/:bid_id', bidsApi.deleteBid);

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler);
}

// start server
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));