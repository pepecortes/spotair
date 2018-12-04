require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require('uglify-js');
var fs = require('fs');
var HTTPStatus = require('http-status');

// start debugging
const debug = require('debug')('app:main');
debug("starting application");

// connect database and models
require('./app_api/models/db');

////create a server object:
//http.createServer(function (req, res) {
  //res.write('Hello world!'); //write a response to the client
  //res.end(); //end the response
//}).listen(3000); //the server object listens on port 8080 

var app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

////define a route, usually this would be a bunch of routes imported from another file
//router.get('/', function (req, res, next) {
    //res.send('Welcome to spotair');
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = HTTPStatus.NOT_FOUND;
  next(err);
});

module.exports = app;
