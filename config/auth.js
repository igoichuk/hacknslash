// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
	
	'facebookAuth' : {
		'clientID'      : '1548904138698894', // your App ID
		'clientSecret'  : 'f4aef6c87300c854edb08df18c07e9f8', // your App Secret
		'callbackURL'   : 'http://localhost:1337/auth/facebook/callback'
	},
	
	/*'twitterAuth' : {
		'consumerKey'       : 'your-consumer-key-here',
		'consumerSecret'    : 'your-client-secret-here',
		'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
	},
	
	'googleAuth' : {
		'clientID'      : 'your-secret-clientID-here',
		'clientSecret'  : 'your-client-secret-here',
		'callbackURL'   : 'http://localhost:8080/auth/google/callback'
	}*/
};