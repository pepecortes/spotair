/** 
* API routes definition
* @module /app_api/index
*/
const debug = require('debug')('app:api:routes');
var express = require('express');
const sendJSON = require('../../app_lib/helpers').sendJSON;

// Define the NOT FOUND controller
const ctrlNotFound = function(req, res) {
	const err = "Error: API call not found"
	sendJSON.notFound(res, err)
}

// Import all the controllers 
const ctrlAerodromes = require('../controllers/aerodromes');
const ctrlAnnees = require('../controllers/annees');
const ctrlThemes = require('../controllers/themes');
const ctrlGaleries = require('../controllers/galeries');
const ctrlPhotographes = require('../controllers/photographes');

module.exports = function(passport) {

	// Start the router
	var router = express.Router();

	// Define the routes
	
	// Aerodromes 
	router.get('/aerodromes', ctrlAerodromes.all);
	router.get('/aerodromes/:id(\\d+)', ctrlAerodromes.byId);
	router.get('/aerodromes/fresh', ctrlAerodromes.fresh);
	router.post('/aerodromes', ctrlAerodromes.create);
	router.put('/aerodromes/:id(\\d+)', ctrlAerodromes.update);
	router.delete('/aerodromes/:id(\\d+)', ctrlAerodromes.delete);
	router.put('/aerodromes/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', ctrlAerodromes.fusion);

	// Annees
	router.get('/annees', ctrlAnnees.all);
	router.get('/annees/:id(\\d+)', ctrlAnnees.byId);
	router.get('/annees/fresh', ctrlAnnees.fresh);
	router.post('/annees', ctrlAnnees.create);
	router.put('/annees/:id(\\d+)', ctrlAnnees.update);
	router.delete('/annees/:id(\\d+)', ctrlAnnees.delete);
	router.put('/annees/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', ctrlAnnees.fusion);

	// Themes
	router.get('/themes', ctrlThemes.all);
	router.get('/themes/:id(\\d+)', ctrlThemes.byId);
	router.get('/themes/fresh', ctrlThemes.fresh);
	router.post('/themes', ctrlThemes.create);
	router.put('/themes/:id(\\d+)', ctrlThemes.update);
	router.delete('/themes/:id(\\d+)', ctrlThemes.delete);
	router.put('/themes/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', ctrlThemes.fusion);

	// Galeries
	router.get('/galeries', ctrlGaleries.all);
	router.get('/galeries/:id(\\d+)', ctrlGaleries.byId);
	router.get('/galeries/fresh', ctrlGaleries.fresh);
	router.post('/galeries', ctrlGaleries.create);
	router.put('/galeries/:id(\\d+)', ctrlGaleries.update);
	router.delete('/galeries/:id(\\d+)', ctrlGaleries.delete);
	router.get('/galeries/spotair', ctrlGaleries.allSpotair);
	router.put('/galeries/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', ctrlGaleries.fusion);

	// Photographes
	router.get('/photographes', ctrlPhotographes.all);
	router.get('/photographes/:id(\\d+)', ctrlPhotographes.byId);
	router.get('/photographes/fresh', ctrlPhotographes.fresh);
	router.post('/photographes', ctrlPhotographes.create);
	router.put('/photographes/:id(\\d+)', ctrlPhotographes.update);
	router.put('/photographes/setPassword/:id(\\d+)', ctrlPhotographes.setPassword)
	router.delete('/photographes/:id(\\d+)', ctrlPhotographes.delete);
	router.get('/photographes/byLogin/:username', ctrlPhotographes.byLogin)

	// Not found
	router.all('/*', ctrlNotFound);
	
	return router
}
