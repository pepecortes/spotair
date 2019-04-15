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

// recent photos
controller.recent = async function(req, res) {
	db.Photo.findAll({
										limit: 50,
										order:[['dateValidation', 'DESC']],
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
 */
controller.validateUpload = function(req, res) {
	const srcId = req.params.id
	
	// create new photo object and take id
	// generate picture and thumbnail and obtain dimensions
	// update photo with the dimension
	// update photoUpload (validate and reference to photo)
	controller._create(req.body)
		.spread((record, created) => record.id)
		.then(destId => storageController._storeImage(srcId, destId))
		.then(info => controller._update(info.id, {height: info.height, width: info.width}))
		.then(picture => photoUploadController._update(srcId, {photo: picture, validated: true}))
		.then(output => sendJSON.ok(res, output))
		.catch(err => debug("error " + err))
}

module.exports = controller


