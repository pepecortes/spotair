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

// Import the model controllers 
const ctrlAerodromes = require('./controllers/aerodromes')
const ctrlAnnees = require('./controllers/annees')
const ctrlThemes = require('./controllers/themes')
const ctrlCompagnies = require('./controllers/compagnies')
const ctrlConstructeurs = require('./controllers/constructeurs')
const ctrlModeles = require('./controllers/modeles')
const ctrlAvions = require('./controllers/avions')
const ctrlAppareils = require('./controllers/appareils')
const ctrlGaleries = require('./controllers/galeries')
const ctrlPhotographes = require('./controllers/photographes')
const ctrlUsers = require('./controllers/users')
const ctrlPhotos = require('./controllers/photos')

// Import the storage controllers
const ctrlStorage = require('./controllers/storage')

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
	standardRouteFactory('appareils', ctrlAppareils)
	standardRouteFactory('galeries', ctrlGaleries)
	standardRouteFactory('photographes', ctrlPhotographes)
	standardRouteFactory('users', ctrlUsers)
	standardRouteFactory('photos', ctrlPhotos)
	
	// Create additional routes
	router.get('/galeries/spotair', (req, res) => ctrlGaleries.allSpotair(req, res))
	router.get('/photographes/actifs', (req, res) => ctrlPhotographes.onlyActives(req, res))
	router.put('/users/setPassword/:id(\\d+)', (req, res) => ctrlUsers.setPassword(req, res))
	router.get('/users/byLogin/:username', (req, res) => ctrlUsers.byLogin(req, res))
	
	// Routes for object storage
	router.get('/storage/getFile', (req, res) => ctrlStorage.getFile(req, res))

	// Not found
	router.all('/*', ctrlNotFound);
	
	return router
}
