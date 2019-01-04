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

// Themes
router.get('/themes', ctrlThemes.all);
router.get('/themes/:id(\\d+)', ctrlThemes.byId);
router.get('/themes/fresh', ctrlThemes.fresh);
router.post('/themes', ctrlThemes.create);
router.put('/themes/:id(\\d+)', ctrlThemes.update);
router.delete('/themes/:id(\\d+)', ctrlThemes.delete);

// Galeries
router.get('/galeries', ctrlGaleries.all);
router.get('/galeries/:id(\\d+)', ctrlGaleries.byId);
router.get('/galeries/fresh', ctrlGaleries.fresh);
router.post('/galeries', ctrlGaleries.create);
router.put('/galeries/:id(\\d+)', ctrlGaleries.update);
router.delete('/galeries/:id(\\d+)', ctrlGaleries.delete);
router.get('/galeries/spotair', ctrlGaleries.allSpotair);

// Not found
router.all('/*', ctrlNotFound);


module.exports = router;
