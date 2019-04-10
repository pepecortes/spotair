/**
 * Common helpers functions
 * @module /app_lib/helpers
 */ 
const debug = require('debug')('app:lib:helpers')
const HTTPStatus = require('http-status')
const path = require('path')
const fs = require('fs')
const fsp = require('fs').promises
const pickObject = require('lodash').pick
const exifParser = require('exif-parser')

var exports = {};

/** 
 * @function
 * @desc Convenience function for sending JSON response on API calls
 * @property {function} response(res,status,content)	- returns a general purpose response
 * @property {function} ok(res,content)	- returns a content and OK status
 * @property {function} notFound(res,err)	- returns a NOTFOUND error
 */
exports.sendJSON = {
	response: (res, status, content) =>	res.status(status).json(content),
	ok: (res, content) => res.status(HTTPStatus.OK).json(content),
	notFound: (res, err) => res.status(HTTPStatus.NOT_FOUND).json(err.toString()),
	serverError: (res, err) => res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err.toString()),
	unauthorized: (res, err) => res.status(HTTPStatus.UNAUTHORIZED).json(err.toString())
}

/**
 * @function
 * @desc Returns the same instance with the associated models IDs completed
 * @param {Object} Instance - Instance of a given model, perhaps with associations
 * @return {Object} Instance - Instance with the IDs of the associated models completed
 * @example {id:3, "theme":{"id":2,"theme":"foo", ...}, ...} -> {id:3, themeId:2, "theme":{"id":2,"theme":"foo", ...}, ...}
 */
exports.resolveAssociations = function(instance) {
	
	function extractId(key, value) {
		if ((value == null) || (typeof value !== 'object') || !('id' in value)) return [false, false]
		var keyId = key + "Id"
		return [keyId, value.id]
	}
	
	var output = JSON.parse(JSON.stringify(instance));
	for (var key in instance) {
		var [keyId, value] = extractId(key, instance[key])
		if (keyId) output[keyId] = value
	}
	return output
	
}

/**
 * @function
 * @desc Returns an instance (suitable for database entry) from the given JSON req.body
 * @desc Attention: models having associated models have to resolve the associated models id: this function will take care of that
 * @param {Object} reqBody - Body of the http request (x-www-form-urlencoded)
 * @param {String[]} fieldsArray - The only fields that will be extracted from the request
 * @return {Object} Instance - Object enclosing the given arrays and with resolved associated models
 */
exports.createInstanceFromQuery = function(reqBody, fieldsArray) {
	const fullRecord = exports.resolveAssociations(reqBody)
	return pickObject(fullRecord, fieldsArray)
}

/**
 * @function checkSourceDestination
 * @description Checks that source and destination exist and are different
 * @param {Object} Model	- sequelize model we are working with
 * @param {number} sourceid	- id of source instance
 * @param {number} destinationid	- id of destination instance
 * @return An error message if the check is failed. An empty string otherwise
 */
exports.checkSourceDestination =  async function(Model, sourceid, destinationid) {
		var error = [];
		var src, dest
		[src, dest] = await Promise.all([
			Model.findByPk(sourceid),
			Model.findByPk(destinationid)
		])
		if (sourceid == destinationid) error.push("source and destination are the same")
		if (!dest) error.push("destination id: " + destinationid + " not found")
		if (!src) error.push("source id: " + sourceid + " not found")
		return (error.length >= 1)? error.join(', ') : ""
}

/**
 * @function dbReplaceReference
 * @description On the given model, replace all references to the source by the destination. Remove source if succesful
 * @param {Object} Model	- sequelize model where the references will be replaced
 * @param {Object} refModel	- sequelize model holding the reference
 * @param {string} refField - name of the field holding the reference to referenceModel
 * @param {number} sourceid	- reference id to replace and remove
 * @param {number} destinationid	- new reference id
 * @return {Object} An object like {updated: 10, idRemoved: "aerodrome"} or null if failed
 */
exports.dbReplaceReference = async function(Model, refModel, refField, sourceid, destinationid) {
	
	// Check first that the query makes sense: source and destination
	// must exist and be different
	const error = await exports.checkSourceDestination(refModel, sourceid, destinationid)
	if (error.length > 0) throw "Error: " + error
	
	// Update the Model table and remove the refModel afterwards
	var output = {}
	const promise = Model.update({[refField]: destinationid},{where: {[refField]: sourceid}})
		.then(result => {
			output.updated = result[0]
			return refModel.findByPk(sourceid)
		})
		.then(result => result.destroy())
		.then(result => {
			output.idRemoved = result.id
			return output
		})
	return promise
}

/**
 * @function jpegMetadata
 * @desc Obtain EXIF + image size by reading the first 65 KB of the jpg
 * @param {string} path	- jpeg path
 * @return {Promise<Object>} {height, width, exiftags...}
 */
async function jpegMetadata(path) {
	const buffer = Buffer.alloc(65535)
	return fsp.open(path)
		.then(fd => fd.read(buffer, 0, 65535, 0))
		.then(reading => {
			var parser = exifParser.create(reading.buffer)
			var result = parser.parse()
			return Object.assign(result.getImageSize(), result.tags)
		})
}
exports.jpegMetadata = jpegMetadata

/**
 * @function jpegMetadataSync
 * @desc synchronous method to obtain the image metadata by reading only 65 KB
 * @param {string} path	- jpeg path
 * @return {Object} {height, width, exiftags}
 */
exports.jpegMetadataSync = function(path) {
	const buffer = Buffer.alloc(65535)
	var fd = fs.openSync(path)
	fs.readSync(fd, buffer, 0, 65535, 0)
	var parser = exifParser.create(buffer)
	var result = parser.parse()
	return Object.assign(result.getImageSize(), result.tags)
}

/**
 * @constant
 * @desc describe several image types
 */
const imgType = {
	picture: 0,
	upload: 1,
	thumbnail: 2,	
}
exports.imgType = imgType


/**
 * @function buildLocalPath
 * @desc Creates filesystem local path related to images types
 * @param {String} id	- id to build the filename as id.jpg
 * @param {Integer} type - see imgType
 * @return {String} absolute local path + filename
 */
exports.buildLocalPath = function(id, type=imgType.picture) {
	var filepath = path.resolve('./', process.env.LOCAL_STORAGE_LOCATION)
	switch(type) {
		case imgType.upload:
			filepath = path.resolve(filepath, process.env.UPLOAD_LOCATION)
			break
		case imgType.thumbnail:
			filepath = path.resolve(filepath, process.env.THUMBNAIL_LOCATION)
			break
		default:
			filepath = path.resolve(filepath, process.env.PICTURE_LOCATION)
	}
	filepath = path.resolve(filepath, `${id}.jpg`)
	return filepath
}


module.exports = exports;
