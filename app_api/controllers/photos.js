/**
 * Photos controller
 * @module /app_api/controllers/photos
 */
const debug = require('debug')('app:api:controllers:photos')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')
const storageController = require('./storage')
const photoUploadController = require('./photouploads')

const controller = new ModelController(db.Photo)

// building other API calls...

// fusion
controller.fusion =  async function(req, res) {
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	sendJSON.serverError(res, "METHOD NOT YET IMPLEMENTED")
}


/**
 * @function byGalerie
 * @desc Filter by galerie id
 */
controller.byGalerie = function(req, res) {
	const id = req.params.id;
	db.Photo
		.findAll({
			where: {galerieId: id},
			order:[['createdAt', 'DESC']],
			include: [{all:true, nested:true}]
		})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function recent
 * @desc Returns the last 'limit' (default=50) recently created photos
 */
controller.recent = async function(req, res) {
	const limit = (req.params.limit)? parseInt(req.params.limit) : 50
	db.Photo.findAll({
										limit: limit,
										order:[['createdAt', 'DESC']],
										include: [{all:true, nested:true}]
										})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function validateUpload
 * @desc Validate referred upload with the given photo data
 * @params {Integer} req.params.id - id of the uploaded photo
 * @params {Object} body - photo data for validation
 * @return {Object} uploaded photo, with reference to validated photo
 */
controller.validateUpload = async function(req, res) {
	// check that the image is not yet validated or rejected
	// create new photo object and return destId
	// generate picture and thumbnail and obtain dimensions
	// update photo with the dimension
	// update photoUpload (validate and a reference to photo)

	const srcId = req.params.id
	photoUploadController._byId(srcId)
		.then(upload => (upload.validated == null)? upload : Promise.reject(new Error('Photo already validated or rejected')))
		.then(() => controller._create(req.body))
		.then(photo => storageController._storeImage(srcId, photo.id, photo.caption))
		.then(info => controller._update(info.id, {height: info.height, width: info.width}))
		.then(photo => photoUploadController._update(srcId, {photo: photo, validated: true}))
		.then(upload => sendJSON.ok(res, upload))
}

/**
 * @function byIds
 * @desc Returns an array of photo objects from the given arrays of ids
 * @params {Array(Integer)} req.body.ids	-	array of photo ids
 * @return {Array(Photos)}
 */
controller.byIds= function(req, res) {
	const ids = req.body.ids
	db.Photo.findAll({
										where: {id: ids},
										include: [{all:true, nested:true}]
									})
		.then(records => sendJSON.ok(res, records))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function watermark
 * @desc Set or remove the photo watermark
 * @params {Integer} req.params.id - id of the existing photo
 * @params {String} req.body.label - watermark text
 * 		If null, watermark with data from the photo object
 * 		If empty, remove watermark
 * @return {Object} photo object???
 */
controller.watermark = async function(req, res) {
	debug("TESTING WATERMARK API: id " + req.params.id)
	debug("req.body.label: " + JSON.stringify(req.body.label))
	sendJSON.ok(res, "ALL OK")
}

module.exports = controller


