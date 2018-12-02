require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HTTPStatus = require('http-status');
//var uglifyJs = require('uglify-js');
//var fs = require('fs');

//require('./app_api/models/db');

//var routesApi = require('./app_api/routes/index');
var app = express();

//uglify settings
//var appClientFiles = [
  //'app_client/app.js',
  //'app_client/home/home.controller.js'
//];
//var uglified = uglifyJs.minify(appClientFiles, {compress: false});
//fs.writeFile('public/angular/app.min.js', uglified.code, function (err) {
  //if(err) {
    //console.log(err);
  //} else {
    //console.log('Script generated and saved: app.min.js');
  //}
//});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.use('/api', routesApi);
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = HTTPStatus.NOT_FOUND;
  next(err);
});

// error handlers

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(HTTPStatus.UNAUTHORIZED);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (process.env.ENV === 'development') {
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
