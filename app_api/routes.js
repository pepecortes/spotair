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
const ctrlAerodromes = require('./controllers/aerodromes')
const ctrlAnnees = require('./controllers/annees')
const ctrlThemes = require('./controllers/themes')
const ctrlCompagnies = require('./controllers/compagnies')
const ctrlGaleries = require('./controllers/galeries')
const ctrlPhotographes = require('./controllers/photographes')

module.exports = function(passport) {

	// Start the router
	var router = express.Router()
	
	// allow localhost or token (Authorization: Bearer eyJ0... in http headers)
	router.use(passport.authenticate(['api', 'jwt'], {session: false}))
	
	// Aerodromes 
	router.get('/aerodromes',	(req, res) => ctrlAerodromes.all(req, res))
	router.get('/aerodromes/:id(\\d+)', (req, res) => ctrlAerodromes.byId(req, res));
	router.get('/aerodromes/fresh', (req, res) => ctrlAerodromes.fresh(req, res))	
	router.post('/aerodromes', (req, res) => ctrlAerodromes.create(req, res))
	router.put('/aerodromes/:id(\\d+)', (req, res) => ctrlAerodromes.update(req, res));
	router.delete('/aerodromes/:id(\\d+)', (req, res) => ctrlAerodromes.delete(req, res));
	router.put('/aerodromes/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', (req, res) => ctrlAerodromes.fusion(req, res));

	// Annees
	router.get('/annees', (req, res) => ctrlAnnees.all(req, res))
	router.get('/annees/:id(\\d+)', (req, res) => ctrlAnnees.byId(req, res))
	router.get('/annees/fresh', (req, res) => ctrlAnnees.fresh(req, res))
	router.post('/annees', (req, res) => ctrlAnnees.create(req, res))
	router.put('/annees/:id(\\d+)', (req, res) => ctrlAnnees.update(req, res))
	router.delete('/annees/:id(\\d+)', (req, res) => ctrlAnnees.delete(req, res))
	router.put('/annees/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', (req, res) => ctrlAnnees.fusion(req, res))

	// Themes
	router.get('/themes', (req, res) => ctrlThemes.all(req, res))
	router.get('/themes/:id(\\d+)', (req, res) => ctrlThemes.byId(req, res))
	router.get('/themes/fresh', (req, res) => ctrlThemes.fresh(req, res))
	router.post('/themes', (req, res) => ctrlThemes.create(req, res))
	router.put('/themes/:id(\\d+)', (req, res) => ctrlThemes.update(req, res))
	router.delete('/themes/:id(\\d+)', (req, res) => ctrlThemes.delete(req, res))
	router.put('/themes/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', (req, res) => ctrlThemes.fusion(req, res))

	// Compagnies
	router.get('/compagnies', (req, res) => ctrlCompagnies.all(req, res))
	router.get('/compagnies/:id(\\d+)', (req, res) => ctrlCompagnies.byId(req, res))
	router.get('/compagnies/fresh', (req, res) => ctrlCompagnies.fresh(req, res))
	router.post('/compagnies', (req, res) => ctrlCompagnies.create(req, res))
	router.put('/compagnies/:id(\\d+)', (req, res) => ctrlCompagnies.update(req, res))
	router.delete('/compagnies/:id(\\d+)', (req, res) => ctrlCompagnies.delete(req, res))
	router.put('/compagnies/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', (req, res) => ctrlCompagnies.fusion(req, res))

	// Galeries
	router.get('/galeries', (req, res) => ctrlGaleries.all(req, res))
	router.get('/galeries/:id(\\d+)', (req, res) => ctrlGaleries.byId(req, res))
	router.get('/galeries/fresh', (req, res) => ctrlGaleries.fresh(req, res))
	router.post('/galeries', (req, res) => ctrlGaleries.create(req, res))
	router.put('/galeries/:id(\\d+)', (req, res) => ctrlGaleries.update(req, res))
	router.delete('/galeries/:id(\\d+)', (req, res) => ctrlGaleries.delete(req, res))
	router.get('/galeries/spotair', (req, res) => ctrlGaleries.allSpotair(req, res))
	router.put('/galeries/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', (req, res) => ctrlGaleries.fusion(req, res))

	// Photographes
	router.get('/photographes', (req, res) => ctrlPhotographes.all(req, res))
	router.get('/photographes/:id(\\d+)', (req, res) => ctrlPhotographes.byId(req, res))
	router.get('/photographes/fresh', (req, res) => ctrlPhotographes.fresh(req, res))
	router.post('/photographes', (req, res) => ctrlPhotographes.create(req, res))
	router.put('/photographes/:id(\\d+)', (req, res) => ctrlPhotographes.update(req, res))
	router.put('/photographes/setPassword/:id(\\d+)', (req, res) => ctrlPhotographes.setPassword(req, res))
	router.delete('/photographes/:id(\\d+)', (req, res) => ctrlPhotographes.delete(req, res))
	router.get('/photographes/byLogin/:username', (req, res) => ctrlPhotographes.byLogin(req, res))

	// Not found
	router.all('/*', ctrlNotFound);
	
	return router
}
