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
			password: password,
			password2: password2			
		};

		db.users.insert(newUser, function(err, doc) {
			if(err) {
				res.send(err);
			} else {
				console.log('User Added!');

				// Success Message
				req.flash('success', 'You are registered and can now log in');

				// Redirect after register
				resp.location('/');
				resp.redirect('/');
			}
		});
	}
});

module.exports = router;