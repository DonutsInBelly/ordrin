const request = require('request');

module.exports = {
  init
}

function init(app, config) {
  app.get('/login', (req, res)=>{
    res.sendfile('views/testlogin.html');
  });

  app.post('/login', (req, res)=>{
    var current_user = req.body.username;
    var current_password = req.body.password;
    console.log(current_user);
    console.log(current_password);

    request({
      method: 'POST',
      url: 'https://api.eatstreet.com/publicapi/v1/signin',
      headers: {
        'X-Access-Token': config.EatStreet,
        'Content-Type': 'application/json'
      },
      body: {
        email: current_user,
        password: current_password
      }
    },
    (error, response, body)=>{
      if(error) {
        res.write(error)
      }
      console.log(body);
      res.end();
    });
    res.sendfile('views/testlogin.html');
  });
}
