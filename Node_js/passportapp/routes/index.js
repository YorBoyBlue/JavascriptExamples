let express = require('express');
let router = express.Router();

router.get('/', ensureAuthenticated, function(req, resp) {
	resp.render('index');
});

function ensureAuthenticated(req, resp, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	resp.redirect('/users/login');
}

module.exports = router;