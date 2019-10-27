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
const ctrlPhotoUploads = require('./controllers/photouploads')
const ctrlInfos = require('./controllers/infos')
const ctrlJournaux = require('./controllers/journaux')
const ctrlLikes = require('./controllers/likes')

// TEST
const testController = require('./controllers/testController')

// Import the storage controllers
const ctrlStorage = require('./controllers/storage')

// Import the search controllers
const ctrlSearch = require('./controllers/search')

module.exports = function(passport) {

	// Start the router
	var router = express.Router()
	
	// allow localhost or token (Authorization: Bearer eyJ0... in http headers key and value)
	router.use(passport.authenticate(['jwt', 'api'], {session: false}))
	
	/**
	 * @desc: DRY: most of the routes look the same. This function creates
	 * them by just passing certain parameters
	 * @param {string} urlString 			- root for the url API call (example '/aerodromes')
	 * @param {function} controller		- controller managing the routes
	 */
	function standardRouteFactory(urlString, controller) {
		const url = '/' + urlString
		router.get(url,	(req, res) => controller.all(req, res))
		router.get(url + '/partial/:limit(\\d+)/:offset(\\d+)',	(req, res) => controller.partial(req, res))
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
	standardRouteFactory('photouploads', ctrlPhotoUploads)
	standardRouteFactory('infos', ctrlInfos)
	standardRouteFactory('journaux', ctrlJournaux)
	standardRouteFactory('likes', ctrlLikes)
	
	// Create additional routes
	router.get('/appareils/byAvion/:id(\\d+)', (req, res) => ctrlAppareils.byAvion(req, res))
	router.get('/photographes/actifs', (req, res) => ctrlPhotographes.onlyActives(req, res))
	router.put('/users/setPassword/:id(\\d+)', (req, res) => ctrlUsers.setPassword(req, res))
	router.get('/users/byLogin/:username', (req, res) => ctrlUsers.byLogin(req, res))
	
	//Routes for querying galeries
	router.get('/galeries/spotair', (req, res) => ctrlGaleries.allSpotair(req, res))
	router.get('/galeries/spotair/byAnnee/:id(\\d+)', (req, res) => ctrlGaleries.spotairByAnnee(req, res))
	router.get('/galeries/byAerodrome/:id(\\d+)', (req, res) => ctrlGaleries.byAerodrome(req, res))
	router.get('/galeries/byAnnee/:id(\\d+)', (req, res) => ctrlGaleries.byAnnee(req, res))
	router.get('/galeries/musees', (req, res) => ctrlGaleries.musees(req, res))
	router.get('/galeries/collectors', (req, res) => ctrlGaleries.collectors(req, res))
	router.get('/galeries/recent/:limit(\\d{0,})', (req, res) => ctrlGaleries.recent(req, res))
	
	// Routes for managing visible & uploaded photos
	router.get('/photos/byUserValidated/:id(\\d+)', (req, res) => ctrlPhotos.byUserValidated(req, res))
	router.get('/photos/recent/:limit(\\d{0,})', (req, res) => ctrlPhotos.recent(req, res))
	router.get('/photos/recentModified/:limit(\\d{0,})', (req, res) => ctrlPhotos.recentModified(req, res))
	router.get('/photos/byGalerie/:id(\\d+)', (req, res) => ctrlPhotos.byGalerie(req, res))
	router.post('/photos/validateUpload/:id(\\d+)', (req, res) => ctrlPhotos.validateUpload(req, res))
	router.post('/photos/byIds', (req, res) => ctrlPhotos.byIds(req, res))
	router.put('/photos/photoUpdate/:id(\\d+)/:removeWatermark?', (req, res) => ctrlPhotos.photoUpdate(req, res))
	router.delete('/photos/photoDelete/:id(\\d+)', (req, res) => ctrlPhotos.photoDelete(req, res))
	router.put('/photos/watermark/:id(\\d+)/:caption?', (req, res) => ctrlPhotos.watermark(req, res))
	
	router.get('/photouploads/pending', (req, res) => ctrlPhotoUploads.pending(req, res))
	router.get('/photouploads/validated', (req, res) => ctrlPhotoUploads.validated(req, res))
	router.get('/photouploads/rejected', (req, res) => ctrlPhotoUploads.rejected(req, res))
	router.get('/photouploads/rejected/byUser/:id(\\d+)', (req, res) => ctrlPhotoUploads.byUserRejected(req, res))
	router.get('/photouploads/pending/byUser/:id(\\d+)', (req, res) => ctrlPhotoUploads.byUserPending(req, res))
	router.put('/photouploads/reject/:id(\\d+)', (req, res) => ctrlPhotoUploads.reject(req, res))
	
	// Routes for object storage
	router.post('/storage/putFile', (req, res) => ctrlStorage.postFile(req, res))
	router.post('/storage/storeImage/srcId/:srcId(\\d+)/destId/:destId(\\d+)/caption/:caption', (req, res) => ctrlStorage.storeImage(req, res))
	router.get('/storage/list', (req, res) => ctrlStorage.list(req, res))
	
	// Routes for search functions
	router.get('/search/fts', (req, res) => ctrlSearch.fts(req, res))
	router.get('/search/fts/idsOnly', (req, res) => ctrlSearch.ftsIdsOnly(req, res))
	router.get('/search/fts/partial/:limit(\\d+)/:offset(\\d+)', (req, res) => ctrlSearch.ftsPartial(req, res))

	// Not found
	router.all('/*', ctrlNotFound);
	
	return router
}
