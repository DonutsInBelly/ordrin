const request = require('request');

module.exports = {
  init
}

function init(app, config) {
  app.post('/login', (req, res)=>{
    var current_user = req.body.username;
    var current_password = req.body.password;

    request({
      method: 'POST',
      url: 'https://api.eatstreet.com/publicapi/v1/signin',
      headers: {
        'X-Access-Token': config.EatStreet,
        'Content-Type': 'application/json'
      },
      formData: {
        email: current_user,
        password: current_password
      }
    },
    (error, response, body)=>{
      console.log(body);
    });
  });
}
