const debug = require('debug')('app:api:storage')
const helpers = require('../../app_lib/helpers')
const buildLocalPath = helpers.buildLocalPath
const imgType = helpers.imgType
const sendJSON = helpers.sendJSON
const SpotairPict = require('../../app_lib/SpotairPict')
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const formidable = require('formidable')
const OVH = require('../../app_lib/OVH')

var containerOVH
const LOCAL_STORAGE = (process.env.STORAGE === "LOCAL")
if (!LOCAL_STORAGE) containerOVH = new OVH()

/**
 * @function
 * @desc Store the file in the current container
 * @param {Object} file		- File object given by the http req
 * @param {String} selectedPath		- Path where the file is stored in the container
 * @return {Promise}
 */
async function storeToContainer(file, selectedPath="") {
	if (LOCAL_STORAGE) {
		const source = path.resolve(file.path)
		const target = path.resolve('./', process.env.LOCAL_STORAGE_LOCATION, selectedPath, file.name)
		return fsp.copyFile(source, target)
	}
	// if OVH remote storage
	const stream = fs.createReadStream(file.path)
	const remotePath = "/" + process.env.CONTAINER_NAME + "/" + selectedPath + file.name
	return containerOVH.write(stream, remotePath)
}

/**
 * @function createThumbnail
 * @desc create and stores a thumbnail out of the uploaded image
 * @param {String} id - id of the image existing in the uploads store
 * @return {Promise} Object containing properties of the thumbnail file (height and width among them)
 */
async function createThumbnail(srcId, destId) {
	if (LOCAL_STORAGE) {
		const source = buildLocalPath(srcId, imgType.upload)
		return fsp.readFile(source)
			.then(buffer => (new SpotairPict(buffer)).thumbnail().toThumbnailFile(destId))
	}
	// if OVH remote storage
	return containerOVH.readUploaded(srcId)
		.then(buffer => (new SpotairPict(buffer)).thumbnail().toThumbnailFile(destId))
}

/**
 * @function createPicture
 * @desc create and stores a spotair-normalized image out of the uploaded image
 * @param {String} srcId 	- id of the image existing in the uploads store
 * @param {String} destId	- id of the copied spotair picture
 * @return {Promise} Object containing properties of the normalized file (height and width among them)
 */
async function createPicture(srcId, destId) {
	if (LOCAL_STORAGE) {
		const source = buildLocalPath(srcId, imgType.upload)
		return fsp.readFile(source)
			.then(buffer => (new SpotairPict(buffer)).normalize().toPictureFile(destId))
	}
	// if OVH remote storage
	return containerOVH.readUploaded(srcId)
		.then(buffer => (new SpotairPict(buffer)).normalize().toPictureFile(destId))
}

async function listContainer() {
	if (LOCAL_STORAGE) {
		const dir = path.resolve('./', process.env.LOCAL_STORAGE_LOCATION)
		debug(`reading folder contents from: ${dir}`)
		return fsp.readdir(dir)
	}
	// if OVH remote storage
	return containerOVH.list()
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
	this._storeImage(srcId, destId)
		.then(output => sendJSON.ok(res, output))
		.catch(err => sendJSON.serverError(res, err))
}

storageController._storeImage = async function(srcId, destId) {
	const p1 = createPicture(srcId, destId)
	const p2 = createThumbnail(srcId, destId)
	return Promise.all([p1, p2]).then(([r1, r2]) => Object.assign({id: destId}, r1))
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
	listContainer()
		.then(output => sendJSON.ok(res, output))	
		.catch(err => sendJSON.serverError(res, err))
}

module.exports = storageController
