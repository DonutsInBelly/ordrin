const config = require('../config.js');
const general = require('./generalRoutes.js');
const EatStreet = require('./EatStreet.js');
const processImage = require('./processImage.js');

module.exports = {
  Handler
}

function Handler(app) {
  general.init(app);
  EatStreet.init(app, config);
  processImage.init(app, config);
}
