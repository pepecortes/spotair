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
const jwt = require("jwt-simple")
var express = require('express')

// authentication middleware functions

// sets the url to be redirected after succesful authentication
// uses req.session
function setRedirect(req, res, next) {
	req.session.redirect = req.originalUrl
	return next()
}

// the route requires authenticated user and an active member
function requireLogin(req, res, next) {
	if (req.isAuthenticated() && req.user.photographe.actif) return next()
	req.flash('loginMessage', 'membre actif requis')
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
	router.use('/dist', express.static(path.join(__dirname, 'dist')))
	router.use('/static', express.static(path.join(__dirname, 'static')))
	
	// favicon
	router.use(favicon(path.join(__dirname, 'static/icons', 'favicon.ico')))
	
	// login pages
	router.get('/login*',
		(req, res) => res.render(path.join(__dirname, 'Login'), {message: req.flash('loginMessage')})
	)
	
	router.get('/logout*',
		(req, res) => {
			req.logout()
			req.session.destroy()
			res.redirect('/')
		}
	)
	
	router.post('/login*',
		passport.authenticate('local', {
			session: true,
			failureRedirect: '/login',
			failureFlash: true
		}),
		(req, res) => {
			const redirect = (req.session.redirect)? req.session.redirect : "/"
			return res.redirect(redirect)
		}
	)
	
	// returns the currently logged user
	router.get('/profile',
		requireLogin,
		(req, res) => sendJSON.ok(res, req.user)
	)
	
	// returns a token than can be used to authorize the API calls
	router.get("/APItoken",
		setRedirect,
		requireLogin,
		requireAdmin,
		function(req, res) {
			var payload = {user: process.env.APIuser}
			try {
				var token = jwt.encode(payload, process.env.JWT_SECRET)
				sendJSON.ok(res, token)
			} catch(e) {sendJSON.serverError(res, e.toString())}
		}
	)
	
	// admin pages
	router.all('/admin*',
		setRedirect,
		requireLogin,
		requireAdmin,
		(req, res) => res.sendFile(path.join(__dirname, 'admin.html'))
	)
	
	// membres pages
	router.all('/pictadd*',
		setRedirect,
		requireLogin,
		(req, res) => res.sendFile(path.join(__dirname, 'pictadd.html'))
	)
	
	// TEST pages
	router.all('/test*',
		//setRedirect,
		//requireLogin,
		(req, res) => res.sendFile(path.join(__dirname, 'test.html'))
	)
	
	// public pages
	router.all('/*',
		(req, res) => res.sendFile(path.join(__dirname, 'index.html'))
	)
	
	return router
}
