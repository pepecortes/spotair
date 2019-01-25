/** 
* API routes definition
* @module /app_api/index
*/
const debug = require('debug')('app:api:routes')
var express = require('express')
const sendJSON = require('../app_lib/helpers').sendJSON

// Define the NOT FOUND controller
const ctrlNotFound = function(req, res) {
	const err = "Error: API call not found"
	sendJSON.notFound(res, err)
}

// Import all the controllers 
const AerodromesCtrl = require('./controllers/aerodromes')
module.exports = function(passport) {

	// Start the router
	var router = express.Router()
	
	// Aerodromes 
	// TEST
	
	const aerodromesCtrl = new AerodromesCtrl()
	router.get('/aerodromes',	(req, res) => aerodromesCtrl.all(req, res))


	// Not found
	router.all('/*', ctrlNotFound);
	
	return router
}
