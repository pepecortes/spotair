/**
 * Main entry for the application
 */ 
require('dotenv').load()
const express = require('express')
const session = require('express-session')
const morgan       = require('morgan')
const RedisStore = require('connect-redis')(session)
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const HTTPStatus = require('http-status')
const { exec } = require('child_process')

const passport = require('passport')
const flash    = require('connect-flash')
require('./config/passport.config')(passport)

// start debugging
const debug = require('debug')('app:main');
debug("starting application");

// connect database and models
require('./app_api/models/db');

// start the express application + renderer (pug)
var app = express();
app.set("view engine", "pug")

const redisOptions = {
	host:process.env.REDIS_HOST,
	port:process.env.REDIS_PORT,
	logErrors:true
}

app.use(session({
	store: new RedisStore(redisOptions),
	secret: process.env.COOKIE_SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(logger('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// serve static pages (i.e pictures)
if (process.env.STORAGE === "LOCAL") {
	app.use('/static', express.static(path.join(__dirname, process.env.LOCAL_STORAGE_LOCATION)))
}

// load the api routes
const routesApi = require('./app_api/routes')
app.use('/api', routesApi(passport))

// load the documentation routes
const routesDoc = require('./doc/routes')
app.use('/doc', routesDoc(passport))

// routes for the client pages
const routesClient = require('./app_client/routes')
app.use('/', routesClient(passport))

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
