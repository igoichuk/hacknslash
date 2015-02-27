// server.js

// Module dependencies
var express = require('express');
//var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var errorHandler = require('errorhandler');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var swig = require('swig');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
swig.setDefaults({ cache: false });

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public'))); // process styl files into css
app.use(express.static(__dirname + '/public'));   // set the static files location /public/img will be /img for users  
app.use(cookieParser()); // read cookies (needed for auth)

// passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport); // pass passport for configuration

// connect to mongoDB database on modulus.io
mongoose.connect('mongodb://localhost:27017/test');

// routes 
var routes = require('./routes/routes.js');
routes(app, passport); // load routes and pass in fully configured passport

//app.get('/', routes.index);
//app.get('/about', routes.about);
//app.get('/contact', routes.contact);

// REST api
var bidsApi = require('./routes/bids.js');
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