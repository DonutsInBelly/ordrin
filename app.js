const express = require('express');
const routes = require('./app/routes.js');

var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static(__dirname + '/views'));
routes.Handler(app);

app.listen(PORT);
