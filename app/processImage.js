module.exports = {
  init
}

function init(app, config) {
	var Clarifai = require('clarifai');
	var app = new Clarifai.App(
		config.clarifai.CLIENT_ID,
		config.clarifai.CLIENT_SECRET
	);

	// using the sample test code
	var concepts = [];
	app.models.predict(Clarifai.GENERAL_MODEL, 'http://www.cicis.com/media/1138/pizza_trad_pepperoni.png').then(
	  function(response) {
	    for(var i in response.data.outputs[0].data.concepts) {
	    	concepts.push(response.data.outputs[0].data.concepts[i].name);
	    	console.log(concepts[i]);
	    }
	  },
	  function(err) {
	    console.error(err);
	  }
	);
}
