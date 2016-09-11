var passport = require('passport');
var User = require('../models/users');

var LocalStrategy   = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	// by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, email, password, done) {

	console.log ("aaa");

	User.findOne({'email': email}, function(err, user) {
		console.log ("111111");
		if (err) {
			res.send(err);
		}
		console.log ("111111");
		if (user) {
			console.log ("111111 email");
			return done(null, false, req.flash('signupMessage', 'That email is already taken. SET IN PASSPORT JS'));
		} else {
			var newUser = new User();
			console.log ("Create user");
			// set the user's local credentials
			newUser.email    = email;
			newUser.password = newUser.encryptPassword(password);

			User.create(
				newUser
				, function (err, data) {
					console.log ('In posttt: ', err);
					if (err)
						return done(err);
					return done(null, newUser);
				});

			// save the user
			/*newUser.save(function(err) {
				if (err)
					return done(err);
				return done(null, newUser);
			});*/
		}

	});
}));