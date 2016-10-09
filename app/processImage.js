module.exports = {
  init
}

function init(app, config) {
	app.post('/image', (req, res)=>{
		var twilio = require('twilio');
		var Clarifai = require('clarifai');

		var urlString = req.body.MediaUrl0;

		// init clarifai
		var app = new Clarifai.App(
			config.clarifai.CLIENT_ID,
			config.clarifai.CLIENT_SECRET
		);

		// get concepts array with sample pizza picture
		var concepts = [];
		app.models.predict(Clarifai.GENERAL_MODEL, urlString).then(
		  function(response) {
		    for(var i in response.data.outputs[0].data.concepts) {
		    	concepts.push(response.data.outputs[0].data.concepts[i].name);
		    	console.log(concepts[i]);
		    }

		    var resp = new twilio.TwimlResponse();
			resp.message('Click here to complete your order! ' + config.base_url + 'now?food=' + concepts[0]);
			res.send(resp.toString());
		  },
		  function(err) {
		    console.error(err);
		  }
		);


	});
}