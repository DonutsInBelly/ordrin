const async = require('async');
const request = require('request');

module.exports = {
  init
}

function init(app, config) {
  app.get('/now', (req, res)=>{
    var food = req.query.food;

    async.waterfall([
      function(callback) {
        callback(null, food, config);
      },
      findRestaurants,
      findMenuItems,
      sendOrder
    ], (err, result)=>{
      if(err) {
        console.log(err);
      }
      console.log(result);
      console.log('done');
      res.render('complete.ejs');
      if (result.error == true) {
        res.render('complete.ejs', {
          error: result.details
        });
      } else {
        res.render('complete.ejs', {
          id: result.apiKey,
          name: result.items[0].name,
          price: result.items[0].totalPrice
        });
      }

    });

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
        'X-Access-Token': config.EatStreet.api,
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

function findRestaurants(food, config, callback) {
  console.log('Finding Restaurants');
  request({
    method: 'GET',
    url: 'https://api.eatstreet.com/publicapi/v1/restaurant/search-test',
    headers: {
      'X-Access-Token': config.EatStreet.api,
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
    console.log(body);
    restaurants = JSON.parse(body).restaurants;
    callback(null, restaurants, food, config);
  });
}

function findMenuItems(restaurants, food, config, callback) {
  console.log('Finding Food');
  for (var i = 0; i < 1; i++) {
    var id = restaurants[i].apiKey;
    //var id = '90fd4587554469b1f15b4f2e73e761809f4b4bcca52eedca';
    //console.log(restaurants);
    console.log('https://api.eatstreet.com/publicapi/v1/restaurant/'+id+'/menu');
    request({
      method: 'GET',
      url: 'https://api.eatstreet.com/publicapi/v1/restaurant/'+id+'/menu',
      headers: {
        'X-Access-Token': config.EatStreet.api,
        'Content-Type': 'application/json'
      },
      qs: {
        includeCustomizations: "false"
      }
    }, (error, response, body)=>{
      console.log('Got Menu Items');
      if(error) {
        console.log(error);
      }
      var body=JSON.parse(body);
      if(body.length>0) {
        if(body[0].items.length==1) {
          console.log('Sending First item');
          callback(null, body[0].items[0].apiKey, id, config);
        } else {
          for (var i = 0; i < body[0].items.length; i++) {
            if (body[0].items[i].indexOf(food)!=-1) {
              console.log('Sending a food item');
              callback(null, body[0].items[i].apiKey, id, config);
            }
          }
        }
      }
    });
  }
}

function sendOrder(item, id, config, callback) {
  console.log('Sending Order');
  var options = {
    "restaurantApiKey": id,
    "items": [
      {
        "apiKey": item,
        "comments": "",
        "customizationChoices": []
      }
    ],
    "method": "pickup",
    "payment": "cash",
    "test": "true",
    "card": {
      "apiKey": null
    },
    "address": {
      "apiKey": null
    },
    "recipient": {
      "apiKey": config.EatStreet.me
    }
  }
  console.log(options);
  request({
    method: 'POST',
    url: 'https://api.eatstreet.com/publicapi/v1/send-order',
    headers: {
      'X-Access-Token': config.EatStreet.api,
      'Content-Type': 'application/json'
    },
    json: {
      "restaurantApiKey": id,
      "items": [
        {
          "apiKey": item,
          "comments": "",
          "customizationChoices": []
        }
      ],
      "method": "pickup",
      "payment": "cash",
      "test": "true",
      "card": {
        "apiKey": null
      },
      "address": {
        "apiKey": null
      },
      "recipient": {
        "apiKey": config.EatStreet.me
      }
    }
  }, (error, response, body)=>{
    if(error) {
      console.log(error)
    }
    callback(null, body);
  });
}
