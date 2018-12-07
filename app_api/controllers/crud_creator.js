 /** Common helpers functions
 * @module /app_api/crud_creator
 * Create standard API calls
 */
const HTTPStatus = require('http-status');
const help = require('../../app_lib/helpers');

/**
 * Convenience function for sending JSON response on API calls
 * @param {Object} res 			- The object that will be sent back 
 * @param {HTTPStatus} status 	- See HTTPStatus node module
 * @param {JSON} content 		- The JSON object 
 * @example sendJSONresponse(res, HTTPStatus.NOT_FOUND, err)
 */ 
const sendJSON = {
	response: function(res, status, content) {
		res.status(status);
		res.json(content);
	},
	ok: function(res, content) {
		res.status(HTTPStatus.OK);
		res.json(content);
	},
	notFound: function(res, error) {
		res.status(HTTPStatus.NOT_FOUND);
		res.json(error);
	},
};

/**
 * Select all themes
 * doc in progress
 */
module.exports.all = function(Modele) {
	return function(req, res) {
		Modele
			.findAll()
			.then(record => sendJSON.ok(res, record))
			.catch(err => sendJSON.notFound(res, err));
	};
}

/**
 * Select a theme given by its id
 * @param {number} req.param.id - id
 * @example
 * GET: http://host:port/api/themes/12
 * @returns
 * The theme (or NOT_FOUND error)
 */
module.exports.byId = function(Modele) {
	return function(req, res) {
		Modele
			.findById(req.params.id)
			.then(record => sendJSON.ok(res, record))
			.catch(err => sendJSON.notFound(res, err));
	};
}

/**
 * Create a theme
 * @param {Object} req.body - theme data
 * @param {string} req.body.theme - theme
 * @example
 * POST: http://host:port/api/themes/ (with form data in the body)
 * @returns
 * The new theme (or NOT_FOUND error)
 */
module.exports.create = function(Modele, fieldsArray) {
	return function(req, res) {
	var record = help.pickObject(req.body, fieldsArray);
		Modele
			.create(record)
			.then(record => sendJSON.ok(res, record))
			.catch(err => sendJSON.notFound(res, err));
	};
}

/**
 * Update a single theme
 * @param {number} req.params.id - theme id
 * @param {Object} req.body - theme data
 * @param {string} req.body.theme - annee
 * @example
 * PUT: http://host:port/api/themes/4 (with form data in the body)
 * @returns
 * The theme modified (or NOT_FOUND error)
 */
module.exports.update = function(Modele, fieldsArray) {
	return function(req, res) {
		const id = req.params.id;
		var record = help.pickObject(req.body, fieldsArray);
		Modele
			.update(record, {where: {id: id}})
			.then(() => Modele.findById(id))
			.then(record => sendJSON.ok(res, record))
			.catch(err => sendJSON.notFound(res, err));
	};
}
