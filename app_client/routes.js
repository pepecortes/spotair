/** 
* Client routes definition for express
* @desc This module defines only main routes for public/pictadd/admin
* @desc Each of them are single page applications with their routers coded in
* @module /app_client/routes
*/
const path = require('path')
const favicon = require('serve-favicon');
const debug = require('debug')('app:client:routes')
const sendJSON = require('../app_lib/helpers').sendJSON
var express = require('express')

// Define the NOT FOUND controller
const ctrlNotFound = function(req, res) {
	// NOT YET COMPLETED
	console.log("in ctrlNotFound")
	const err = "Error: route not found"
	sendJSON.notFound(res, err)
}

const ctrlLogin = function(req, res) {
	// NOT YET COMPLETED
	console.log("in ctrlLogin")
	const message = req.flash('loginMessage')
	sendJSON.notFound(res, message)
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	debug("authenticating...")
	
	return next() //NOT YET COMPLETED. I DO NOT AUTHENTICATE YET
	

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
			return next();

	// if they aren't redirect them to the home page
	debug("sorry;  not authenticated")
	res.redirect('/');
}

module.exports = function(passport) {

	// Start the router
	var router = express.Router()

	// Define the routes
	
	// static routes
	router.use('/dist', express.static(path.join(__dirname, 'dist')))
	router.use('/static', express.static(path.join(__dirname, 'static')))
	
	// favicon
	router.use(favicon(path.join(__dirname, 'static/icons', 'favicon.ico')))
	
	// TEST AUTHENTICATION
	router.get(
		'/login*',
		(req, res) => res.sendFile(path.join(__dirname, 'login.html'))
	)
	
	router.post('/login*',
		passport.authenticate('local', {
			session: false,
			successRedirect: '/admin',
			failureRedirect: '/login',
			failureFlash: true
		}),
		function(req, res) {console.log("function gets called")}
	)
	
	// admin
	router.all(
		'/admin*',
		isLoggedIn,
		(req, res) => res.sendFile(path.join(__dirname, 'admin.html'))
	)
	
	// public
	router.all(
		'/*',
		(req, res) => res.sendFile(path.join(__dirname, 'index.html'))
	)
	
	// Not found
	router.all('/notfound', ctrlNotFound)
	
	return router
}
