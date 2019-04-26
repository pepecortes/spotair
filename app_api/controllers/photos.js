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
 * @desc Returns the last 50 recently createdf photos
 */
controller.recent = async function(req, res) {
	db.Photo.findAll({
										limit: 50,
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
		.then(photoCreated => photoCreated[0].id)
		.then(destId => storageController._storeImage(srcId, destId))
		.then(info => controller._update(info.id, {height: info.height, width: info.width}))
		.then(photo => photoUploadController._update(srcId, {photo: photo, validated: true}))
		.then(upload => sendJSON.ok(res, upload))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = controller


