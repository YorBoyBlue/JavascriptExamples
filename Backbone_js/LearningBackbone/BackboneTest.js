// Creating Models ==================================================================================

// Create a model
var Song = Backbone.Model.extend({
	// The defaults object is used to set default attributes when creating instances of the model that can also be overriden on creation
	defaults: {
		genre: "Jazz",
		listeners: 0
	},
	// The initialize function is called when an intance is created
	initialize: function(){
		console.log("A new song has been created.")
	},
	// The validate function is called everytime you try to set and attribute on the model
	validate: function(attrs) {
		if(!attrs.title) {
			return "Title is required";
		}
	}
});

// Creating Instances and Adding Attributes ===========================================================

// Create an instance of the backbone model Song() that we declared above
var song = new Song();

// Different ways to set attributes for the model
// song.set("title", "Blue in Green");
// song.set({
// 	artist: "Miles Davis",
// 	publishYear: 1959
// });

// Set attributes for the model
song.set({
	title: "Blue in Green",
	artist: "Miles Davis",
	publishYear: 1959
});

// Convert Backbone model to a JSON object
songJSON = song.toJSON();

console.log(song);
console.log(songJSON);

// You can create backbone model instance from a JSON object as well
newSongJSON = {
	title: "Back in Black",
	artist: "ACDC",
	publishYear: 1980,
	genre: "Rock"
}
newSong = new Song(newSongJSON);
console.log(newSong);

// Get an attribute
songArtist = newSong.get("title");
console.log(songArtist);

// Remove an attribute
newSong.unset("title");
console.log(newSong);

// remove all attributes of a model
// newSong.clear();
// console.log(newSong);

// Check if model has a certain attribute
console.log(newSong.has("title"));

// Model Validation ===================================================================================

var validateSong = new Song({
	artist: "ACDC",
	publishYear: 1980,
	genre: "Rock"
});
// Check if song is valid
console.log(validateSong.isValid());
// Get error message
console.log(validateSong.validationError);
// Fix validation error
validateSong.set("title", "Back in Black");
console.log(validateSong.isValid());

// Connection to the Server ==========================================================================

// var Song = Backbone.Model.extend({
// 	// This is how you will specify the url for where this model will connect to the DB
// // If you have not specified the urlRoot and you try to connect to the DB using one of the methods below, you will get an error
// 	urlRoot: "/api/songs"
// });

// This is creating an instance of the Song model and then fetching the song with id=1 from the server DB
// var song = new Song({id: 1});
// song.fetch();
// Result is a GET /api/songs/1

// This is updating the title of the fetched row above and saving it to the DB
// It is a PUT request because the song has been fetched already, so Backbone assumes it is not a new entry
// If it was not fetched first, it would be a POST request
// song.set("title", "newTitle");
// song.save();
// result is a PUT /api/songs/1

// Delete a model from the DB
// song.destroy();
// result is DELETE /api/songs/1

// By convention Backbone assumes the attribute named id is used to uniquely identify them
// If you want to assign a different variable name to the uid you can use the idAttribute to assign it
// var Song = Backbone.Model.extend({
// 	idAttribute: "songId"
// });

// These methods accept a success and error callback
// song.fetch({
// 	success: function() {
// 		// Do something...
// 	},
// 	error: function() {
// 		// Do something else...
// 	}
// });

// The save method is used a bit differently because the first arg is an object that can be passed to set certain attributes of the model to be saved
// You can set the attributes with the set method and then just pass an empty object as the first arg as well
// song.save({
// 	title: "someTitle"
// },
// {
// 	success: function() {
// 		// Do something...
// 	},
// 	error: function() {
// 		// Do something else...
// 	}
// });

// song.save({}, {
// 	success: function() {
// 		// Do something...
// 	},
// 	error: function() {
// 		// Do something else...
// 	}
// });

// Creating Collections of Models ======================================================================

var Songs = Backbone.Collection.extend({
	model: Song
});

var songs = new Songs([
	new Song({
		title: "song1"
	}),
	new Song({
		title: "song2"
	})
]);

// Underscore provides many methods to assist working with collections
songs.add(new Song({ title: "song3"}));

console.log(songs);
// Return the model for a given index from the collection
console.log(songs.at(0));
// You could also access it using the get method with the cid (temporary client id that is generated by Backbone to track the collections models)
console.log(songs.get("c4"));

// Remove a model from the collection
// songs.remove(songs.at(0));
// console.log(songs);

// Inheritance =======================================================================================

var Animal = Backbone.Model.extend({
	walk: function() {
		console.log("Animal is walking...");
	}
});

var Dog = Animal.extend();
var dog = new Dog();
console.log(dog);
dog.walk();

// Override the base class method
var Cat = Animal.extend({
	walk: function() {
		// You can call the base class function as well. Like a Super call in C++. It is not as clean but is definitely possible
		// Animal.prototype.walk.apply(this);
		console.log("Cat is walking...")
	}
});
var cat = new Cat();
cat.walk();

// Creating Views ====================================================================================

// var SongView = Backbone.View.extend({
// 	// This is where we implement the rendering logic
// 	render: function() {
// 		// Access the DOM element with jQuery
// 		this.$el.html("Hello World");
// 		// By convention we return a reference to this view at the end of the render function
// 		return this;
// 	}
// });

// var songView = new SongView({el: "#container"});
// songView.render();

// We can override the element that is associated with this view with diiferent properties
// var SongView = Backbone.View.extend({

// 	tagName: "span",

// 	className: "song",

// 	id: "1234",

// 	attributes: {
// 		"data-genre": "Rock"
// 	},

// 	// This is where we implement the rendering logic
// 	render: function() {
// 		// Access the DOM element with jQuery
// 		this.$el.html("Hello World");
// 		// By convention we return a reference to this view at the end of the render function
// 		return this;
// 	}
// });

// // If you don't specify a DOM element Backbone will generate one or use the one specified as the tagName property when 
// // declaring the model. It will need to be manually inserted into the page.
// var songView = new SongView();

// // This will insert the songView into the #container div element.
// // Notice that we eliminated the render call and can chain it here
// $("#container").html(songView.render().$el);

// Using Views with Models/Collections ===============================================================

// Single model
// var SongView = Backbone.View.extend({
	
// 	tagName: "li",

// 	// This is where we implement the rendering logic
// 	render: function() {
// 		// Access the DOM element with jQuery
// 		this.$el.html(this.model.get("title"));
// 		// By convention we return a reference to this view at the end of the render function
// 		return this;
// 	}
// });

// var songView = new SongView({el: "#container", model: song});
// songView.render();

// // Collection 
// var SongsView = Backbone.View.extend({

// 	// This is where we implement the rendering logic
// 	render: function() {
// 		// We need to store a reference to this view because the context of {this} changes inside the callback function
// 		var self = this;

// 		this.model.each(function(song) {
// 			var songView = new SongView({ model: song });
// 			// Access the DOM element with jQuery
// 			self.$el.append(songView.render().$el);;
// 		});
// 	}
// });

// var songsView = new SongsView({el: "#container", model: songs});
// songsView.render();

// Responding to to DOM/model events ====================================================================

Simple example
var SongView = Backbone.View.extend({

	events: {
		"click": "onClick"
	},

	onClick: function() {
		console.log("Listening to song!!");
	},
	
	tagName: "li",

	// This is where we implement the rendering logic
	render: function() {
		// Access the DOM element with jQuery
		this.$el.html(this.model.get("title") + " <button>Listen</button>");
		// By convention we return a reference to this view at the end of the render function
		return this;
	}
});

var songView = new SongView({model: song});
$("#container").html(songView.render().$el);

More advanced

var SongView = Backbone.View.extend({

	events: {
		"click": "onClick",
		"click .bookmark": "onClickBookmark"
	},

	onClick: function() {
		console.log("Listening to song!!");
	},

	onClickBookmark: function(e) {
		// We can stop this event from being passed to any other handler in the chain
		// If this is not done, the Bookmark button would fire the specific event and the generic one we set first
		e.stopPropagation();

		console.log("Bookmark Clicked");
	},
	
	tagName: "li",

	// This is where we implement the rendering logic
	render: function() {
		// Access the DOM element with jQuery
		this.$el.html(this.model.get("title") + " <button>Listen</button>  <button class='bookmark'>Bookmark</button>");
		// By convention we return a reference to this view at the end of the render function
		return this;
	}
});

var songView = new SongView({model: song});
$("#container").html(songView.render().$el);

// Real-time Notifications =======================================================================

var SongView = Backbone.View.extend({

	events: {
		"click": "onClick"
	},

	onClick: function() {
		console.log("Listening to song!!");
		listeners = this.model.get("listeners");
		listeners += 1;
		this.model.set("listeners", listeners);
	},
	
	tagName: "li",

	initialize: function() {
		this.model.on("change", this.onModelChange, this);
	},

	onModelChange: function() {
		// You don't always need to call the render function when the model changes
		// Sometimes you will want to add some css or some other action
		this.render();
	},

	// This is where we implement the rendering logic
	render: function() {

		// Access the DOM element with jQuery
		this.$el.html(this.model.get("title") + " <button>Listen</button>" + " - Listeners: " + this.model.get("listeners"));
		// By convention we return a reference to this view at the end of the render function
		return this;
	}
});

var songView = new SongView({model: song});
$("#container").html(songView.render().$el);

// Templating Views ================================================================================

// var SongView = Backbone.View.extend({

// 	// This is where we implement the rendering logic
// 	render: function() {
		
// 		var template = _.template($("#songTemplate").html());
// 		var html = template(this.model.toJSON());
// 		this.$el.html(html);
// 		// By convention we return a reference to this view at the end of the render function
// 		return this;
// 	}
// });

// var otherSong = new Song({ title: "Back in Balck", plays: 1000 })

// var songView = new SongView({el: "#container", model: otherSong});
// songView.render();













