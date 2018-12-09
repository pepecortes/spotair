 /** Common helpers functions
 * @module /app_api/crudator
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
	response: (res, status, content) =>	res.status(status).json(content),
	ok: (res, content) => res.status(HTTPStatus.OK).json(content),
	notFound: (res, err) => res.status(HTTPStatus.NOT_FOUND).json(err.toString())
};

function buildBasicAPI(Model, fieldsArray, hasForeignKeys) {
	
	const includeOption = (hasForeignKeys)? {include: [{all:true, nested:true}]} : {};
	
	return {
		
		all: (req, res) => {
			Model
				.findAll(includeOption)
				.then(record => sendJSON.ok(res, record))
				.catch(err => sendJSON.notFound(res, err));
		},
		
		byId: (req, res) => {
			Model
				.findByPk(req.params.id, includeOption)
				.then(record => sendJSON.ok(res, record))
				.catch(err => sendJSON.notFound(res, err));
		},
		
		create: (req, res) => {
			const record = help.pickObject(req.body, fieldsArray);
			Model
				.create(record)
				.then(record => Model.findByPk(record.id, includeOption))
				.then(record => sendJSON.ok(res, record))
				.catch(err => {sendJSON.notFound(res, err)});
		},
		
		update: (req, res) => {
			var updates = help.pickObject(req.body, fieldsArray);
			Model
				.findByPk(req.params.id, includeOption)
				.then(record => {
					record = Object.assign(record, updates);
					return record.save();
				})
				.then(record => Model.findByPk(record.id, includeOption))
				.then(record => sendJSON.ok(res, record))
				.catch(err => sendJSON.notFound(res, err));
		},
		
		delete: (req, res) => {
			Model
				.findByPk(req.params.id, includeOption)
				.then(record => record.destroy())
				.then(() => sendJSON.ok(res, "Removed. id: " + req.params.id))
				.catch(err => sendJSON.notFound(res, err));
		},
				
	};

}

module.exports.buildBasicAPI = buildBasicAPI;


///**
 //* Select all themes
 //* doc in progress
 //*/
//module.exports.all = function(Modele) {
	//return function(req, res) {
		//Modele
			//.findAll()
			//.then(record => sendJSON.ok(res, record))
			//.catch(err => sendJSON.notFound(res, err));
	//};
//}

///**
 //* Select a theme given by its id
 //* @param {number} req.param.id - id
 //* @example
 //* GET: http://host:port/api/themes/12
 //* @returns
 //* The theme (or NOT_FOUND error)
 //*/
//module.exports.byId = function(Model, hasAssociatedModels = false) {
	//const includeOption = (hasAssociatedModels)? {include: [{all:true, nested:true}]} : null;
	//return function(req, res) {
		//Model
			//.findByPk(req.params.id, includeOption)
			//.then(record => sendJSON.ok(res, record))
			//.catch(err => sendJSON.notFound(res, err));
	//};
//}

///**
 //* Create a theme
 //* @param {Object} req.body - theme data
 //* @param {string} req.body.theme - theme
 //* @example
 //* POST: http://host:port/api/themes/ (with form data in the body)
 //* @returns
 //* The new theme (or NOT_FOUND error)
 //*/
//module.exports.create = function(Modele, fieldsArray) {
	//return function(req, res) {
	//var record = help.pickObject(req.body, fieldsArray);
		//Modele
			//.create(record)
			//.then(record => sendJSON.ok(res, record))
			//.catch(err => sendJSON.notFound(res, record));
	//};
//}

///**
 //* Update a single theme
 //* @param {number} req.params.id - theme id
 //* @param {Object} req.body - theme data
 //* @param {string} req.body.theme - annee
 //* @example
 //* PUT: http://host:port/api/themes/4 (with form data in the body)
 //* @returns
 //* The theme modified (or NOT_FOUND error)
 //*/
//module.exports.update = function(Modele, fieldsArray) {
	//return function(req, res) {
		//const id = req.params.id;
		//var record = help.pickObject(req.body, fieldsArray);
		//Modele
			//.update(record, {where: {id: id}})
			//.then(() => Modele.findByPk(id))
			//.then(record => sendJSON.ok(res, record))
			//.catch(err => sendJSON.notFound(res, err));
	//};
//}
