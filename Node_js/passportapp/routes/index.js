let express = require('express');
let router = express.Router();

router.get('/', function(req, resp) {
	resp.render('index');
});

module.exports = router;