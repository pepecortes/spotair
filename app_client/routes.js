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

// authentication middleware functions

// the route requires authenticated user
function requireLogin(req, res, next) {
	if (req.isAuthenticated()) return next()
	// TO BE COMPLETED: give feedback to user
	debug("sorry:  not authenticated")
	res.redirect('/login');
}

// the route requires an admin user
function requireAdmin(req, res, next) {
	if (req.user.isAdmin) return next()
	// TO BE COMPLETED: give feedback to user
	debug("sorry:  not admin")
	res.redirect('/login');
}

module.exports = function(passport) {

	// Start the router
	var router = express.Router()
	
	// static routes
	router.use('/dist', express.static(path.join(__dirname, 'dist')))
	router.use('/static', express.static(path.join(__dirname, 'static')))
	
	// favicon
	router.use(favicon(path.join(__dirname, 'static/icons', 'favicon.ico')))
	
	// login pages
	router.get('/login/failed',
		(req, res) => sendJSON.ok(res,{pepe: "failed"})
	)
	
	router.get('/login/ok',
		requireLogin,
		(req, res) => sendJSON.ok(res,{pepe: "success"})
	)
	
	router.get('/login*',
		(req, res) => {
			debug("EN GET LOGIN " + req.flash('loginMessage'))
			res.sendFile(path.join(__dirname, 'login.html'))
		}
	)
	
	router.post('/login*',
		passport.authenticate('local', {
			session: true,
			successRedirect: '/login/ok',
			failureRedirect: '/login/failed',
			failureFlash: true
		})
	)
	
	// admin pages
	router.all('/admin*',
		requireLogin,
		requireAdmin,
		(req, res) => {debug("logged user is: " + req.user.mail);res.sendFile(path.join(__dirname, 'admin.html'))}
	)
	
	// public pages
	router.all('/*',
		(req, res) => res.sendFile(path.join(__dirname, 'index.html'))
	)
	
	// Not found
	router.all('/notfound', ctrlNotFound)
	
	return router
}
