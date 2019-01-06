/**
 * Common helpers functions
 * @module /app_lib/helpers
 */ 
const debug = require('debug')('app:lib:helpers');
const HTTPStatus = require('http-status');
const pickObject = require('lodash').pick;

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
	serverError: (res, err) => res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err.toString())
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


module.exports = exports;
