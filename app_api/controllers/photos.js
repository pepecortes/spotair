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
 * @function recentModified
 * @desc Returns the last 'limit' (default=50) recently modified photos
 */
controller.recentModified = async function(req, res) {
	const limit = (req.params.limit)? parseInt(req.params.limit) : 50
	db.Photo.findAll({
										limit: limit,
										order:[['updatedAt', 'DESC']],
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
	// refresh FTS
	const srcId = req.params.id
	photoUploadController._byId(srcId)
		.then(upload => (upload.validated == null)? upload : Promise.reject(new Error('Photo already validated or rejected')))
		.then(() => controller._create(req.body))
		.then(photo => storageController._storeImage(srcId, photo.id, photo.caption))
		.then(info => controller._update(info.id, {height: info.height, width: info.width}))
		.then(photo => {
			const p1 = photoUploadController._update(srcId, {photo: photo, validated: true})
			const p2 = db.updateFTSindex()
			return Promise.all([p1, p2])
		})
		.then(([upload, x]) => sendJSON.ok(res, upload))
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
 * @function photoUpdate
 * @desc Update a photo and watermark
 * @params {Integer} req.params.id - id of the existing photo
 * @params {Object} req.body.* - data to update the object
 * @params {String} req.params.removeWatermark - true / false
 * @return {Object} photo object
 */
controller.photoUpdate = async function(req, res) {
	const photoId = req.params.id
	const removeWatermark = (/true/i).test(req.params.removeWatermark) // convert to Boolean
	const caption = (removeWatermark)? "" : null
	return controller._update(req.params.id, req.body)
		.then(photo => {
			const p1 = this._watermark(photo, caption)
			const p2 = db.updateFTSindex()
			return Promise.all([p1, p2])
		})
		.then(([photo, x]) => sendJSON.ok(res, photo))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function watermark
 * @desc Set or remove the photo watermark
 * @params {Integer} req.params.id - id of the existing photo
 * @params {String} req.body.caption - watermark text
 * 		If null, watermark with data from the photo object
 * 		If empty, remove watermark
 * @return {Object} photo object
 */
controller.watermark = async function(req, res) {
	const photoId = req.params.id
	let caption = req.body.caption
	db.Photo.findByPk(photoId, {include: [{all:true, nested:true}]})
		.then(photo => this._watermark(photo, caption))
		.then(result => sendJSON.ok(res, result))
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function _watermark
 * @desc Set or remove the photo watermark
 * @params {Photo} photo - photo to watermark
 * @params {String} caption - watermark text
 * 		default = null: watermark with data from the photo object
 * 		If empty string, remove watermark
 * @return {Object} the photo object
 */
controller._watermark = async function(photo, caption=null) {
	const caption_str = (typeof caption === 'string')? caption : photo.caption
	return photo.original
		.then(original => storageController._storeImage(original.id, photo.id, caption_str))
		.then(() => photo)
}

/**
 * @function _invalidate
 * @desc Invalidate a photo that was previously validated
 * @params {Integer} photoId	- id the existing Photo
 * @return {Object} photoUpload object that has been invalidated
 */
controller._invalidate = async function(photo) {
	photo.original
		.then(original => {
			original.validated = false
			return original.save()
		})
}

/**
 * @function photoDelete
 * @desc Delete a photo and manage all dependencies
 * @params {Integer} req.params.id - id of an existing photo
 * @return {Photo} the deleted photo object
 */
controller.photoDelete = async function(req, res) {
	// Invalidate photo from photoUploads and remove link
	// Remove 
	//		photo from likes
	// 		images
	// 		photo from photos
	// Build FTS again
	const id = req.params.id
	photoUploadController._rejectExistingPhoto(id)
		.then(() => db.Photo.findByPk(id, {include: [{all:true, nested:true}]}))
		.then(photo => {
			p1 = photo.deleteAllViews()
			p2 = storageController._deletePicture(id)
			p3 = photo.destroy()
			return Promise.all([p1, p2, p3])
		})
		.then(() => db.updateFTSindex())
		.then(() =>	sendJSON.ok(res, id))
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = controller


