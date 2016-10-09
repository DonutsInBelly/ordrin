const async = require('async');
const request = require('request');

module.exports = {
  init
}

function init(app, config) {
  app.get('/now', (req, res)=>{
    var food = req.query.food;

    async.waterfall({})

  });

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

function findRestaurants(callback) {
  request({
    method: 'GET',
    url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search-test',
    headers: {
      'X-Access-Token': config.EatStreet,
      'Content-Type': 'application/json'
    },
    qs: {
      latitude: 40.7328931,
      longitude: -74.0006281,
      method: 'both',
      search: food
    },
    rejectUnauthorized: false
  }, (error, response, body)=>{
    if(error) {
      console.log(error);
    }
    restaurants = JSON.parse(body).restaurants;
    callback(null, restaurants, food);
  });
}

function findMenuItems(restaurants, callback) {
  for (var i = 0; i < 3; i++) {
    var id = restaurants[i];
    request({
      method: 'GET',
      url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search-test',
      headers: {
        'X-Access-Token': config.EatStreet,
        'Content-Type': 'application/json'
      },
    });
  }
}
