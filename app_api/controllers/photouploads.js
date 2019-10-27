/**
 * Photo Uploads controller
 * @module /app_api/controllers/photouploads
 */
const debug = require('debug')('app:api:controllers:photouploads')
const db = require('../models/db')
const sendJSON = require('../../app_lib/helpers').sendJSON
const ModelController = require('./modelController')

var controller = new ModelController(db.PhotoUpload)

// building other API calls...

// photos pending validation only
controller.pending =  (req, res) =>	filterValidation(req, res, "pending")

// photos validated only
controller.validated =  (req, res) =>	filterValidation(req, res, "validated")

// photos rejected only
controller.rejected =  (req, res) =>	filterValidation(req, res, "rejected")

// select photos filtered by validation statuns (pending, rejected, validated)
function filterValidation(req, res, scopeString = "pending") {
	db.PhotoUpload.scope(scopeString)
		.findAll({include: [{all:true}]})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));	
}

/**
 * @function byUserRejected
 * @desc Return the rejected photos filtered by photographe id 
 */
controller.byUserRejected = function(req, res) {
	debug("PHOTOUPLOADS IN USER REJECTED TO BE COMPLETED")
	const id = req.params.id
	db.PhotoUpload.findAll({
			where: {photographeId: id},
			order:[['createdAt', 'DESC']],
			include: [{all:true, nested:true}]
		})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function reject
 * @desc Reject the referred upload, only if it is not yet validated
 * @params {Integer} req.params.id - id of the uploaded photo
 */
controller.reject = async function(req, res) {
	const id = req.params.id
	controller._byId(id)
		.then(record => {
			if (record.validated != null) return Promise.reject(new Error('status is not pending'))
			else return controller._update(id, {validated: false})
		})
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function _rejectExistingPhoto
 * @desc Reject and PhotoUpload that was previously accepted
 *       (photo already exists)
 * @params {Integer} id	-	id of the existing photo (not the photoUpload)
 */
controller._rejectExistingPhoto = async function(id) {
	return db.PhotoUpload.findOne({where: {photoId: id}})
		.then(photoUpload => {
			photoUpload.validated = false
			photoUpload.photoId = null
			return photoUpload.save()
		})
}

// fusion
controller.fusion =  async function(req, res) {
	const sourceid = req.params.sourceid;
	const destinationid = req.params.destinationid;
	sendJSON.serverError(res, "METHOD NOT YET IMPLEMENTED")
}

module.exports = controller


