const debug = require('debug')('app:api:storage')
const helpers = require('../../app_lib/helpers')
const sendJSON = helpers.sendJSON
const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const formidable = require('formidable')

const LOCAL_STORAGE = (process.env.STORAGE === "LOCAL") 

var OVHStorage = require('node-ovh-storage')
var configOVH = {
	username:	process.env.OVH_USERNAME,
	password:	process.env.OVH_PASSWORD,
	authURL:	process.env.OVH_AUTH_URL,
  tenantId: process.env.OVH_TENTANT_ID,
  region: 	process.env.OVH_REGION
}
const containerOVH = new OVHStorage(configOVH)

/**
 * @function
 * @desc Store the file in the current container
 * @param {Object} file		- File object given by the http req
 * @param {String} path		- Path where the file is stored in the container
 * @return {Promise} Promise that resolves or error
 */
function storeToContainer(file, selectedPath="") {
	if (LOCAL_STORAGE) {
		const source = path.resolve(file.path)
		const target = path.resolve('./', process.env.LOCAL_STORAGE_LOCATION, selectedPath, file.name)
		debug(`local file copy from: ${source} to ${target}`)
		return fsp.copyFile(source, target)
	}
	// if OVH remote storage...
	function putFilePromise() {
		var stream = fs.createReadStream(file.path)
		const remotePath = "/" + process.env.CONTAINER_NAME + "/" + selectedPath + file.name
		debug(`OVH file copy from: ${file.path} to ${remotePath}`)
		return new Promise((resolve, reject) =>
			containerOVH.putStream(stream, remotePath, (err, data) => {
				if (err !== null) reject(err)
				else resolve(data)
			}))
	}
	return getOVHToken(containerOVH).then(() => putFilePromise())
}

// TEST
function copyToContainer(id, selectedPath="") {
	const filename  = id + ".jpg"
	const target = path.resolve('./', process.env.LOCAL_STORAGE_LOCATION, selectedPath, filename)
	return `src: ${filename} -> tgt: ${target}`
}

function listContainer() {
	if (LOCAL_STORAGE) {
		const dir = path.resolve('./', process.env.LOCAL_STORAGE_LOCATION)
		debug(`reading folder contents from: ${dir}`)
		return fsp.readdir(dir)
	}
	// if OVH remote storage...
	function getListPromise() {
		return new Promise((resolve, reject) =>
			containerOVH.getFileList("/" + process.env.CONTAINER_NAME, (err, data) => {
				if (err !== null) reject(err)
				else resolve(data)
			}))
	}
	return getOVHToken(containerOVH).then(() => getListPromise())
}

/** @function
 * @desc Needed for getting access to OVH container
 * @param {Container} container
 * @return {Promise} Promise that resolves if the token is obtained
 */
function getOVHToken(container) {
	return new Promise((resolve, reject) => container.getToken((err, data) => {
		if (err !== null) reject(err)
		else resolve(data)
	}))
}


/**
 * @Object
 * @desc DOC IN PROGRESS
 * @param DOC IN PROGRESS
 */
var storageController = {}


/**
 * @function
 * @desc Copy file (given by its path) to the selected storage
 */
 // TESTING
storageController.copyFile = function(req, res) {
	const id = req.params.id
	const output = copyToContainer(id, "selectedPath")
	sendJSON.ok(res, "output: " + output)
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
		.catch(err => {
			debug(err)
			sendJSON.serverError(res, err)
		})
}

module.exports = storageController
