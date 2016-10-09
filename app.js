const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes.js');

var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
routes.Handler(app);

app.listen(PORT);
