// app/routes.js
module.exports = function (app, passport) {

	app.get('/', function (req, res) {
		//res.sendfile('index.html');
		res.render('index', { title: "bids app123", loggedIn: req.isAuthenticated() }); 
	});
	
	// login
	app.get('/login', function (req, res) {
		
		// render the page and pass in any flash data if it exists
		res.render('login', { message: req.flash('loginMessage') });
	});
		
	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	// signup
	app.get('/signup', function (req, res) {
		
		// render the page and pass in any flash data if it exists
		res.render('signup', { message: req.flash('signupMessage') });
	});
	
	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	// profile	
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	// =====================================
	// FACEBOOK 
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	
	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));
	
	// =====================================
	// EPAM 
	// =====================================
	app.get('/auth/epam', passport.authenticate('epam'));
	
	app.get('/auth/epam/callback', passport.authenticate('epam', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));
	
	// logout
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	
	// if they aren't redirect them to the home page
	res.redirect('/login');
}