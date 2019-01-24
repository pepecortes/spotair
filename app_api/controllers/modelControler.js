 /**
  * DOC NOT COMPLETED
  */
const debug = require('debug')('app:api:modelController')
const pickObject = require('lodash').pick
const helpers = require('../../app_lib/helpers')
const db = require('../models/db')
const sendJSON = helpers.sendJSON
const createInstanceFromQuery = helpers.createInstanceFromQuery
const dbReplaceReference = helpers.dbReplaceReference

/**
 * @Object
 * @desc Create a controller for the given Model.
 * @desc Create the basic CRUD API calls (all, byId, fresh, create, udpate, delete)
 * @param {Object} Model - Model for which we are creating the API calls
 */ 
function ModelController(Model) {
	this.Model = Model
	this.includeOption = (Model.metadata.hasForeignKeys)? {include: [{all:true}]} : {};
}
	
ModelController.prototype.all = function(req, res) {
	this.Model
		.findAll(this.includeOption)
		.then(record => sendJSON.ok(res, record))
		.catch(err => sendJSON.serverError(res, err));
}

module.exports = ModelController
	
	//byId: (req, res) => {
		//const id = req.params.id;
		//Model
			//.findByPk(id, includeOption)
			//.then((record) => {
				//if (record) sendJSON.ok(res, record);
				//else sendJSON.notFound(res, "id: " + id + " not found");
			//})
			//.catch(err => sendJSON.serverError(res, err));
	//},
	
	//// Returns a fresh instance of the Model (not existing in the db yet)
	//fresh: (req, res) => {
		//var instance = Model.build();
		//sendJSON.ok(res, instance);
	//},
	
	//create: (req, res) => {
		//const record = createInstanceFromQuery(req.body, Model.metadata.fieldNames)
		//Model
			//.findOrCreate({where: record})
			//.spread((record, created) => sendJSON.ok(res, record))
			//.catch(err => {sendJSON.serverError(res, err)});
	//},
	
	//update: (req, res) => {
		//debug("updating record")
		//debug("fieldnames " + Model.metadata.fieldNames)
		//debug("req.body " + req.body.nom)
		//var updates = createInstanceFromQuery(req.body, Model.metadata.fieldNames);
		//debug("updates: " + JSON.stringify(updates))
		//Model
			//.findByPk(req.params.id, includeOption)
			//.then(record => {
				//record = Object.assign(record, updates);
				//return record.save();
			//})
			//.then(record => Model.findByPk(record.id, includeOption))
			//.then(record => sendJSON.ok(res, record))
			//.catch(err => sendJSON.serverError(res, err));
	//},
	
	//delete: (req, res) => {
		//Model
			//.findByPk(req.params.id)
			//.then(record => record.destroy())
			//.then(() => sendJSON.ok(res, "Removed. id: " + req.params.id))
			//.catch(err => sendJSON.serverError(res, err));
	//},
				

//}




