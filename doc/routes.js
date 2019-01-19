/** 
* Documentation routes definition for express
* @desc This module defines the routes for the documentation server
* @module /doc/routes
*/
const path = require('path')
const debug = require('debug')('app:client:routes')
const express = require('express')
const serveIndex = require('serve-index')

// sets the url to be redirected after succesful authentication
// uses req.session
function setRedirect(req, res, next) {
	req.session.redirect = req.originalUrl
	return next()
}

// the route requires authenticated user
function requireLogin(req, res, next) {
	if (req.isAuthenticated()) return next()
	res.redirect('/login');
}

// the route requires an admin user
function requireAdmin(req, res, next) {
	if (req.user.isAdmin) return next()
	req.flash('loginMessage', 'admin requis')
	res.redirect('/login');
}

module.exports = function(passport) {

	// Start the router
	var router = express.Router()
	
	// static routes
	router.use('/',
		setRedirect,
		requireLogin,
		requireAdmin,
		express.static(path.join(__dirname, '')),
		serveIndex(path.join(__dirname, ''), {icons: true, view: "details"})
	)
	
	return router
}
