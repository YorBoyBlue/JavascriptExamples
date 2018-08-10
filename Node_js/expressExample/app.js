// MongoDB Init =====================================================
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
	if (err) {
		return console.dir(err);
	}

	var db = client.db('mytestingdb');

	db.collection('customers').findOne({}, function (err, result) {
		if (err) {
			return console.dir(err);
		}
		console.log('connected to MongoDB');

		myDocument = {
			name: 'John Doe',
			email: 'John@gmail.com'
		};
		myDocuments = [
			{
				name: 'Jane Doe',
				email: 'Jane@gmail.com'
			},
			{
				name: 'Arin Blue',
				email: 'a@gmail.com'
			}	
		];
		
		filters = {
			'name': 'John Doe'
		};
		// data = {
		// 	'email': 'Derp@something.com'
		// };

		// InsertDocument(db, myDocument, function() {
		// 	client.close();
		// });

		// InsertDocuments(db, myDocuments, function() {
		// 	client.close();
		// });
		
		// FindAllDocuments(db, function() {
		// 	client.close();
		// });
		
		// QueryDocuments(db, filters, function() {
		// 	client.close();
		// });

		// UpdateDocument(db, filters, data, function() {
		// 	client.close();
		// });

		// ReplaceDocument(db, filters, data, function() {
		// 	client.close();
		// });

		// DeleteDocument(db, filters, function() {
		// 	client.close();
		// });
		
		FindAllDocuments(db, function() {
			client.close();
		});


		// client.close();
	});
});

// Insert Single Doc
const InsertDocument = function(db, document, callback) {
	// Get Collection
	const collection = db.collection('users');
	// Insert Docs
	collection.insert(document, function(err, result) {
		if(err) {
			return consle.dir(err);
		}
		console.log('Inserted Document');
		console.log(result);
		callback(result);
	});
}

// Insert Multiple Docs
const InsertDocuments = function(db, documents, callback) {
	// Get Collection
	const collection = db.collection('users');
	// Insert Docs
	collection.insertMany(documents, function(err, result) {
		if(err) {
			return consle.dir(err);
		}
		console.log('Inserted ' + result.ops.length + ' Documents');
		console.log(result);
		callback(result);
	});
}

// Find Documents
const FindAllDocuments = function(db, callback) {
	// Get Collection
	const collection = db.collection('users');

	collection.find({}).toArray(function(err, docs) {
		if(err) {
			return consle.dir(err);
		}

		console.log('Found the following records:');
		console.log(docs);
		callback(docs);		
	});
}

// Query documents
const QueryDocuments = function(db, queryFilters, callback) {
	// Get Collection
	const collection = db.collection('users');

	collection.find(filters).toArray(function(err, docs) {
		if(err) {
			return consle.dir(err);
		}

		console.log('Found the following record(s):');
		console.log(docs);
		callback(docs);		
	});
}

// Update document
const UpdateDocument = function(db, queryFilters, data, callback) {
	// Get Collection
	const collection = db.collection('users');

	collection.updateOne(filters, {$set: data}, function(err, result) {
		if(err) {
			return consle.dir(err);
		}

		console.log('Updated Document');
		callback(result);		
	});
}

// Replace document
const ReplaceDocument = function(db, queryFilters, data, callback) {
	// Get Collection
	const collection = db.collection('users');

	collection.updateOne(filters, data, function(err, result) {
		if(err) {
			return consle.dir(err);
		}

		console.log('Replaced Document');
		callback(result);		
	});
}

// Delete document
const DeleteDocument = function(db, queryFilters, callback) {
	// Get Collection
	const collection = db.collection('users');

	collection.deleteOne(filters, function(err, result) {
		if(err) {
			return consle.dir(err);
		}

		console.log('Deleted Document');
		callback(result);		
	});
}


// Node and Express JS Init ==========================================
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let pug = require('pug');

let port = 3000;

let app = express();

app.set('view engine', 'pug');

// Middlewares =====================================================
// Custom Middleware
app.use(function(req, resp, next) {
	console.log('Time: ', Date.now());
	next();
});
// Required Body Parser Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes ============================================================
app.get('/', function(req, resp) {
	resp.render('index', {
		title: 'Hello World',
		showTitle: true,
		people: ['John', 'Steve', 'Bob']
	});
});
app.get('/about', function(req, resp) {
	resp.render('about', {
		title: 'About Page'
	});
});
app.get('/contact', function(req, resp) {
	resp.send('Contact Page');
});


// Start App ==========================================================
app.listen(port);

console.log('Server running on port: ' + port);

module.exports = app;