/**
 * Main entry for the application
 */ 
require('dotenv').load();
const express = require('express');
const session = require('express-session')
const RedisStore = require('connect-redis')(session) 
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const HTTPStatus = require('http-status');

// start debugging
const debug = require('debug')('app:main');
debug("starting application");

// connect database and models
require('./app_api/models/db');

// start the express application
var app = express();

const redisOptions = {
	host:process.env.REDIS_HOST,
	port:process.env.REDIS_PORT
}

app.use(session({
	store: new RedisStore(redisOptions),
	secret: process.env.COOKIE_SESSION_SECRET,
	resave: false
}))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

// load the api routes
var routesApi = require('./app_api/routes/index');
app.use('/api', routesApi);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = HTTPStatus.NOT_FOUND;
  next(err);
});

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(HTTPStatus.UNAUTHORIZED);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (process.env.ENV === 'dev') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
