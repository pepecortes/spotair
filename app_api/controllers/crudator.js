 /**
  * Engine for creating a simple CRUD API given the model
  * @module /app_api/crudator
  */
const debug = require('debug')('app:api:crudator');
const pickObject = require('lodash').pick;
const sendJSON = require('../../app_lib/helpers').sendJSON;
const createInstanceFromQuery = require('../../app_lib/helpers').createInstanceFromQuery;

/**
 * @function
 * @desc Call this function to create the basic API calls
 * @param {Object} Model - Model for which we are creating the API calls
 * @return {Object} object made of functions(req, res) (all, byId, fresh,
 * create, udpate, delete) ready to be used in API routes
 */ 
function buildBasicAPI(Model) {
	
	const includeOption = (Model.metadata.hasForeignKeys)? {include: [{all:true}]} : {};
	
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
					if (record) sendJSON.ok(res, record);
					else sendJSON.notFound(res, "id: " + id + " not found");
				})
				.catch(err => sendJSON.serverError(res, err));
		},
		
		// Returns a fresh instance of the Model (not existing in the db yet)
		fresh: (req, res) => {
			var instance = Model.build();
			sendJSON.ok(res, instance);
		},
		
		create: (req, res) => {
			const record = createInstanceFromQuery(req.body, Model.metadata.fieldNames)
			Model
				.findOrCreate({where: record})
				.spread((record, created) => sendJSON.ok(res, record))
				.catch(err => {sendJSON.serverError(res, err)});
		},
		
		update: (req, res) => {
			debug("updating record")
			debug("fieldnames " + Model.metadata.fieldNames)
			debug("req.body " + req.body.nom)
			var updates = createInstanceFromQuery(req.body, Model.metadata.fieldNames);
			debug("updates: " + JSON.stringify(updates))
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




