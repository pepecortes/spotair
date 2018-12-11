/**
 * Common helpers functions
 * @module /app_lib/helpers
 */ 
const debug = require('debug')('app:lib:helpers');
const HTTPStatus = require('http-status');

var exports = {};

/**
 * @function
 * @desc Builds an object out of another by picking only the selected properties 
 * @param {Object} object - The input object
 * @param {string[]} arrayOfProperties - The array of the properties you want to pick up
 * @returns {Object} Returns an object containing the selected properties only
 * @example
 * pickObject({a: 1, b: 2, c: 3}, ['a', 'b']) = {a: 1, b: 2}
 */
exports.pickObject = function pickObject(object, arrayOfProperties) {
	var output = {};
	for (const p of arrayOfProperties) {
		if (object[p]) output[p] = object[p];
	}
	return output;
}

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
};


module.exports = exports;
