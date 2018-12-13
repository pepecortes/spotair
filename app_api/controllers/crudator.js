 /**
  * Engine for creating a simple CRUD API given the model
  * @module /app_api/crudator
  */
const debug = require('debug')('app:api:crudator');
const sendJSON = require('../../app_lib/helpers').sendJSON;
const pickObject = require('../../app_lib/helpers').pickObject;

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
	
	const includeOption = (hasForeignKeys)? {include: [{all:true}]} : {};
	
	return {
		
		all: (req, res) => {
			Model
				.findAll(includeOption)
				.then(record => sendJSON.ok(res, record))
				.catch(err => sendJSON.serverError(res, err));
		},
		
		byId: (req, res) => {
			const id = req.params.id;
			Model
				.findByPk(id, includeOption)
				.then((record) => {
					if (record) return sendJSON.ok(res, record);
					else return sendJSON.notFound(res, "id: " + id + " not found");
				})
				.catch(err => sendJSON.serverError(res, err));
		},
		
		create: (req, res) => {
			const record = pickObject(req.body, fieldsArray);
			Model
				.create(record)
				.then(record => Model.findByPk(record.id, includeOption))
				.then(record => sendJSON.ok(res, record))
				.catch(err => {sendJSON.serverError(res, err)});
		},
		
		update: (req, res) => {
			var updates = pickObject(req.body, fieldsArray);
			Model
				.findByPk(req.params.id, includeOption)
				.then(record => {
					record = Object.assign(record, updates);
					return record.save();
				})
				.then(record => Model.findByPk(record.id, includeOption))
				.then(record => sendJSON.ok(res, record))
				.catch(err => sendJSON.serverError(res, err));
		},
		
		delete: (req, res) => {
			Model
				.findByPk(req.params.id)
				.then(record => record.destroy())
				.then(() => sendJSON.ok(res, "Removed. id: " + req.params.id))
				.catch(err => sendJSON.serverError(res, err));
		},
				
	};

}

module.exports.buildBasicAPI = buildBasicAPI;




