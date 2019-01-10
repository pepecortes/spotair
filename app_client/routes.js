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
	console.log("in ctrlNotFound")
	const err = "Error: route not found"
	sendJSON.notFound(res, err)
}

// TEST
const ctrlTest = function(req, res) {
	try {
		console.log("dirname is " + __dirname)
		const x = __dirname + 'index.html'
		console.log("x is " + x)
		console.log("in ctrlTest: " + path.join(__dirname, 'index.html'))
		res.sendFile(path.join(__dirname, 'app_client', 'index.html'))
	} catch {err => console.log(JSON.stringify(err))}
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
