module.exports = {
  init
}

function init(app, config) {
	var Clarifai = require('clarifai');
	var app = new Clarifai.App(
		config.CLIENT_ID,
		config.CLIENT_SECRET
	);

	// sample test code
	// predict the contents of an image by passing in a url
	app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
	  function(response) {
	    console.log(response);
	  },
	  function(err) {
	    console.error(err);
	  }
	);
}


