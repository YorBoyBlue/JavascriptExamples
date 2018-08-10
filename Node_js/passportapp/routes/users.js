let express = require('express');
let router = express.Router();

// Login Page - GET
router.get('/login', function(req, resp) {
	resp.render('login');
});

// Register Page - GET
router.get('/register', function(req, resp) {
	resp.render('register');
});

module.exports = router;