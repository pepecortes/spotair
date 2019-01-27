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
const ctrlConstructeurs = require('./controllers/constructeurs')
const ctrlModeles = require('./controllers/modeles')
const ctrlAvions = require('./controllers/avions')
const ctrlGaleries = require('./controllers/galeries')
const ctrlPhotographes = require('./controllers/photographes')

module.exports = function(passport) {

	// Start the router
	var router = express.Router()
	
	// allow localhost or token (Authorization: Bearer eyJ0... in http headers)
	router.use(passport.authenticate(['api', 'jwt'], {session: false}))
	
	/**
	 * @desc: DRY: most of the routes look the same. This function creates
	 * them by just passing certain parameters
	 * @param {string} urlString 			- root for the url API call (example '/aerodromes')
	 * @param {function} controller		- controller managing the routes
	 */
	function standardRouteFactory(urlString, controller) {
		const url = '/' + urlString
		router.get(url,	(req, res) => controller.all(req, res))
		router.get(url + '/:id(\\d+)', (req, res) => controller.byId(req, res))
		router.get(url + '/fresh', (req, res) => controller.fresh(req, res))	
		router.post(url, (req, res) => controller.create(req, res))
		router.put(url + '/:id(\\d+)', (req, res) => controller.update(req, res))
		router.delete(url + '/:id(\\d+)', (req, res) => controller.delete(req, res))
		router.put(url + '/fusion/source/:sourceid(\\d+)/destination/:destinationid(\\d+)', (req, res) => controller.fusion(req, res))
	}
	
	// Create standard CRUD routes
	standardRouteFactory('aerodromes', ctrlAerodromes)
	standardRouteFactory('annees', ctrlAnnees)
	standardRouteFactory('themes', ctrlThemes)
	standardRouteFactory('compagnies', ctrlCompagnies)
	standardRouteFactory('constructeurs', ctrlConstructeurs)
	standardRouteFactory('modeles', ctrlModeles)
	standardRouteFactory('avions', ctrlAvions)
	standardRouteFactory('galeries', ctrlGaleries)
	standardRouteFactory('photographes', ctrlPhotographes)
	
	// Create additional routes
	router.get('/galeries/spotair', (req, res) => ctrlGaleries.allSpotair(req, res))
	router.put('/photographes/setPassword/:id(\\d+)', (req, res) => ctrlPhotographes.setPassword(req, res))
	router.get('/photographes/byLogin/:username', (req, res) => ctrlPhotographes.byLogin(req, res))

	// Not found
	router.all('/*', ctrlNotFound);
	
	return router
}
