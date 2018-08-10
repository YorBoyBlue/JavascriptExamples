let http = require('http');
let fs = require('fs');

let host = '127.0.0.1';
let port = '3000';

fs.readFile('./index.html', function(err, data) {
	if(err) {
		console.log(err);
		return;
	}

	let server = http.createServer(function(req, resp) {
		resp.statusCode = 200;
		resp.setHeader('Content-Type', 'text/html');
		resp.write(data);
		resp.end();
	});

	server.listen(port , host, function() {
		console.log('Server is running on port ' + port);
	});	
});