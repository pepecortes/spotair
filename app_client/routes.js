/** 
* Client routes definition for express
* @desc This module defines only main routes for public/pictadd/admin
* @desc Each of them are single page applications with their routers coded in
* @module /app_client/routes
*/
const debug = require('debug')('app:client:routes');
var express = require('express');
const sendJSON = require('../app_lib/helpers').sendJSON;

// Define the NOT FOUND controller
const ctrlNotFound = function(req, res) {
	// NOT YET COMPLETED
	const err = "Error: route not found"
	sendJSON.notFound(res, err)
}

// TEST
const ctrlTest = function(req, res) {
	res.sendFile(path.join(__dirname, 'app_client', 'index.html'))
}

module.exports = function(passport) {

	// Start the router
	var router = express.Router();

	// Define the routes
	router.all('/admin', ctrlTest)
	
	// Not found
	router.all('/notfound', ctrlNotFound)
	
	return router
}
