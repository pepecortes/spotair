 /**
  * Engine for creating a simple CRUD API given the model
  * @module /app_api/crudator
  */
const HTTPStatus = require('http-status');
const help = require('../../app_lib/helpers');
const debug = require('debug')('app:api:crudator');

/** 
 * @function
 * @desc Convenience function for sending JSON response on API calls
 * @property {function} response(res,status,content)	- returns a general purpose response
 * @property {function} ok(res,content)	- returns a content and OK status
 * @property {function} notFound(res,err)	- returns a NOTFOUND error
 */
const sendJSON = {
	response: (res, status, content) =>	res.status(status).json(content),
	ok: (res, content) => res.status(HTTPStatus.OK).json(content),
	notFound: (res, err) => res.status(HTTPStatus.NOT_FOUND).json(err.toString())
};

/**
 * @function
 * @desc Call this function to create the basic API calls
 * @param {Object} Model - Model for which we are creating the API calls
 * @param {String[]} fieldsArray - fields that compose the model (excluding virtuals, but including foreingKeys)
 * @param {Boolean} hasForeignKeys - whether or not the Model has foreignKeys (needed for eager loading or related Models) 
 * @return {Object} object made of functions(req, res) (all, byId,
 * create, udpate, delete) ready to be used in API routes
 */ 
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
			debug(record);
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




