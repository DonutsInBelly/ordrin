const config = require('../config.js');
const general = require('./generalRoutes.js');
const oauthEatStreet = require('./oauthEatStreet.js');

module.exports = {
  Handler
}

function Handler(app) {
  general.init(app);
  oauthEatStreet.init(app, config);
}
