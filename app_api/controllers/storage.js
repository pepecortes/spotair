const debug = require('debug')('app:api:storage')
const sendJSON = require('../../app_lib/helpers').sendJSON
const SpotairPict = require('../../app_lib/SpotairPict')
const fs = require('fs')
const fsp = require('fs').promises
const formidable = require('formidable')
const OVH = require('../../app_lib/OVH')
const LocalStorage = require('../../app_lib/LocalStorage')

const container = (process.env.STORAGE === "LOCAL")? new LocalStorage() : new OVH()

/**
 * @function
 * @desc Store the file in the current container
 * @param {Object} file		- File object given by the http req
 * @param {String} selectedPath		- Path where the file is stored in the container
 * @return {Promise}
 */
async function storeToContainer(file, selectedPath = "") {
	const buffer = fs.readFileSync(file.path)
	const filepath = selectedPath + file.name
	return container.write(buffer, filepath)
}

/**
 * @Object
 * @desc DOC IN PROGRESS
 * @param DOC IN PROGRESS
 */
var storageController = {}

/**
 * @function
 * @desc Store the uploaded image (given by its id) to Pictures and Thumbnails storage
 * @param {String} srcId - source Id
 * @param {String} destId - Id for the generated images
 * @return {Object} Object containing id, height and width of the stored picture
 */
storageController.storeImage = function(req, res) {
	const srcId = req.params.srcId
	const destId = req.params.destId
	const caption = req.params.caption
	this._storeImage(srcId, destId, caption)
		.then(output => sendJSON.ok(res, output))
		.catch(err => sendJSON.serverError(res, err))
}

storageController._storeImage = async function(srcId, destId, caption) {
	// create both picture and thumbnail and store into the container
	// watermark the caption
	return container.readUploaded(srcId)
		.then(buffer => {
			const p1 = (new SpotairPict(buffer)).normalize()
				.then(img => img.watermark(caption))
				.then(img => img.toPictureFile(destId))
			const p2 = (new SpotairPict(buffer)).thumbnail()
				.then(img => img.toThumbnailFile(destId))
			return Promise.all([p1, p2])
		})
		.then(([r1, r2]) => r1.dimensions())
		.then(data => Object.assign({id: destId}, data))
}

storageController.postFile = function(req, res) {
	var form = new formidable.IncomingForm()
	form.parse(req, function(err, fields, files) {
		if (!files.file) {
			sendJSON.serverError(res, "Missing file")
			return
		}
		storeToContainer(files.file, fields.path)
			.then(output => sendJSON.ok(res, output))	
			.catch(err => sendJSON.serverError(res, err))
	})
}

storageController.list = function(req, res) {
	container.list()
		.then(output => sendJSON.ok(res, output))	
		.catch(err => sendJSON.serverError(res, err))
}

/**
 * @function _deletePicture
 * @desc Remove both the picture and the thumbnail files from the storage
 *       (does not remove the uploaded image file)
 * @param {Integer} id - picture id
 * @param {Boolean} removeThumbnail - whether or notthe thubnail is removed
 */
storageController._deletePicture = function(id, removeThumbnail=true) {
	return container.deletePicture(id)
		.then(() => {return (removeThumbnail)? container.deleteThumbnail(id) : true})
}

module.exports = storageController
