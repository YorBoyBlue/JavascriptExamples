let express = require('express');
let router = express.Router();
let mongojs = require('mongojs');
let db = mongojs('passportapp', ['users']);
let bcrypt = require('bcryptjs');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

// Login Page - GET
router.get('/login', function(req, resp) {
	resp.render('login');
});

// Register Page - GET
router.get('/register', function(req, resp) {
	resp.render('register');
});

// Register - POST
router.post('/register', function(req, resp) {
	// Get form values
	let name = req.body.name;
	let email = req.body.email;
	let username = req.body.username;
	let password = req.body.password;
	let password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Please use a valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	// Check for errors
	let errors = req.validationErrors();

	if(errors) {
		console.log('Form has errors');
		resp.render('register', {
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2
		});
	} else {
		let newUser = {
			name: name,
			email: email,
			username: username,
			password: password		
		};

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(newUser.password, salt, function(err, hash) {
				newUser.password = hash;

				db.users.insert(newUser, function(err, doc) {
					if(err) {
						res.send(err);
					} else {
						console.log('User Added!');

						// Success Message
						req.flash('success', 'You are registered and can now log in');

						// Redirect after register
						resp.location('/users/login');
						resp.redirect('/users/login');
					}
				});
			});
		});
	}
});

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	db.users.findOne(
		{
			_id: mongojs.ObjectId(id)
		},
		function(err, user) {
			done(err, user);
		}
	);
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		db.users.findOne({username: username}, function(err, user) {
			if(err) {
				return done(err);
			}
			if(!user) {
				return done(null, false, {message: 'Incorrect Username'});
			}

			bcrypt.compare(password, user.password, function(err, found) {				
				if(err) {
					return done(err);
				}
				if(found) {
					return done(null, user);
				} else {
					return done(null, false, {message: 'Incorrect Password'});
				}
			});
		});
	}
));

router.post('/login', 
	passport.authenticate(
		'local', 
		{ 	successRedirect: '/',
			failureRedirect: '/users/login',
			failureFlash: 'Invalid Username or Password'}), 
		function(req, resp) {
			console.log('Auth Successful');
			resp.redirect('/');
});

router.get('/logout', function(req, resp) {
	req.logout();
	req.flash('success', 'You have logged out')
	resp.redirect('/users/login');
});

module.exports = router;