let express = require('express');
let path = require('path');
let expressValidator = require('express-validator');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let bodyParser = require('body-parser');
let flash = require('connect-flash');
let pug = require('pug');

let routes = require('./routes/index');
let users = require('./routes/users');

let app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set Static Folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express Session Middleware
app.use(session(
	{
		secret: 'secret',
		saveUninitialized: true,
		resave: true
	}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		let namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// Connect-Flash Middleware
app.use(flash());
app.use(function(req, resp, next) {
	resp.locals.messages = require('express-messages')(req, resp);
	next();
});

// Define Routes
app.use('/', routes);
app.use('/users', users);

// Start App
app.listen(3000);
console.log('Server running on port 3000');


